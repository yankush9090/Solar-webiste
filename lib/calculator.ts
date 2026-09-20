import {
  CalculatorInputs,
  CalculatorResult,
  CalculatorSettings,
  CalculatorSubsidySlab
} from './types';
import {
  INITIAL_CALCULATOR_SETTINGS,
  INITIAL_SUBSIDY_SLABS
} from './data/initial-data';

export function calculateSolar(
  inputs: CalculatorInputs,
  settings: CalculatorSettings = INITIAL_CALCULATOR_SETTINGS,
  slabs: CalculatorSubsidySlab[] = INITIAL_SUBSIDY_SLABS
): CalculatorResult {
  const monthlyBill = Math.max(inputs.monthly_bill || 0, 500);
  const tariff = settings.default_tariff || 8.0;
  const monthlyUnitsNeeded = monthlyBill / tariff;
  const genPerKwPerMonth = settings.generation_per_kw_per_month || 120;

  let rawCapacity = monthlyUnitsNeeded / genPerKwPerMonth;
  let recommendedKw = Math.round(rawCapacity * 2) / 2;
  if (recommendedKw < 1) recommendedKw = 1;
  if (recommendedKw > 500) recommendedKw = 500;

  let costMultiplier = 1.0;
  if (inputs.system_type === 'Hybrid') costMultiplier = 1.45;
  else if (inputs.system_type === 'Off-Grid') costMultiplier = 1.65;

  const baseCostPerKw = settings.cost_per_kw || 60000;
  const totalCost = recommendedKw * baseCostPerKw * costMultiplier;

  let subsidyAmount = 0;
  if (inputs.property_type === 'Residential' && inputs.system_type !== 'Off-Grid') {
    const matchedSlab = slabs.find(
      (s) => recommendedKw >= s.min_kw && recommendedKw <= s.max_kw
    );
    if (matchedSlab) {
      subsidyAmount = matchedSlab.subsidy_amount;
    } else if (recommendedKw > 3) {
      subsidyAmount = 78000;
    } else {
      subsidyAmount = 30000;
    }
  }

  const netCustomerCost = Math.max(totalCost - subsidyAmount, 0);
  const estimatedMonthlyUnits = Math.round(recommendedKw * genPerKwPerMonth);
  const estimatedAnnualUnits = estimatedMonthlyUnits * 12;
  const estimatedMonthlySavings = Math.round(estimatedMonthlyUnits * tariff);
  const estimatedAnnualSavings = estimatedMonthlySavings * 12;

  const paybackYears =
    estimatedAnnualSavings > 0
      ? Math.round((netCustomerCost / estimatedAnnualSavings) * 10) / 10
      : 4.0;

  const co2TonsAnnual = Math.round(estimatedAnnualUnits * (settings.co2_factor || 0.82) / 1000 * 10) / 10;
  const requiredRoofSqft = Math.round(recommendedKw * 85);

  return {
    recommended_capacity_kw: recommendedKw,
    estimated_monthly_units: estimatedMonthlyUnits,
    estimated_annual_units: estimatedAnnualUnits,
    estimated_monthly_savings: estimatedMonthlySavings,
    estimated_annual_savings: estimatedAnnualSavings,
    estimated_system_cost: Math.round(totalCost),
    estimated_subsidy: subsidyAmount,
    estimated_net_cost: Math.round(netCustomerCost),
    estimated_payback_years: paybackYears,
    co2_reduction_tons_annual: co2TonsAnnual,
    required_roof_sqft: requiredRoofSqft
  };
}
