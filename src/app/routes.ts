import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";
import { Home } from "./Home";
import { SalaryInput } from "./SalaryInput";
import { RealityCheck } from "./RealityCheck";
import { ProfessionalComparison } from "./ProfessionalComparison";
import { CareerGrowth } from "./CareerGrowth";
import { PayGapVisualization } from "./PayGapVisualization";
import { SalaryImpact } from "./SalaryImpact";
import { NegotiationStrategy } from "./NegotiationStrategy";
import { AiNegotiationSimulator } from "./AiNegotiationSimulator";
import { ConfidenceScore } from "./ConfidenceScore";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "salary-input", Component: SalaryInput },
      { path: "reality-check", Component: RealityCheck },
      { path: "professional-comparison", Component: ProfessionalComparison },
      { path: "career-growth", Component: CareerGrowth },
      { path: "pay-gap", Component: PayGapVisualization },
      { path: "salary-impact", Component: SalaryImpact },
      { path: "negotiation-strategy", Component: NegotiationStrategy },
      { path: "simulator", Component: AiNegotiationSimulator },
      { path: "confidence-score", Component: ConfidenceScore },
    ],
  },
]);