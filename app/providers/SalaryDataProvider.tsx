"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ProfileData = {
  role: string;
  seniority: string;
  yearsExperience: string;
  techStack: string[];
  tools: string[];
  englishLevel: string;
  englishUsage: string;
  otherLanguages: string;
  roleDescription: string;
  country: string;
  city: string;
  workMode: string;
  companyType: string;
  contractType: string;
  workSchedule: string;
  companyOrigin: string;
  monthlySalary: number;
  currency: string;
  salaryType: string;
  hasBonus: string;
  lastIncrease: string;
  negotiationConfidence: number;
  wantsAiPractice: string;
};

type SalaryData = {
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData) => void;
  currentSalary: number;
  setCurrentSalary: (salary: number) => void;
  averageSalary: number;
  setAverageSalary: (salary: number) => void;
  gapPercentage: number;
  setGapPercentage: (gap: number) => void;
  prefillRole: string;
  setPrefillRole: (role: string) => void;
  prefillSeniority: string;
  setPrefillSeniority: (seniority: string) => void;
};

const SalaryDataContext = createContext<SalaryData | null>(null);

export function SalaryDataProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [currentSalary, setCurrentSalary] = useState(5500);
  const [averageSalary, setAverageSalary] = useState(7800);
  const [gapPercentage, setGapPercentage] = useState(23);
  const [prefillRole, setPrefillRole] = useState("Frontend Developer");
  const [prefillSeniority, setPrefillSeniority] = useState("");

  return (
    <SalaryDataContext.Provider
      value={{
        profileData,
        setProfileData,
        currentSalary,
        setCurrentSalary,
        averageSalary,
        setAverageSalary,
        gapPercentage,
        setGapPercentage,
        prefillRole,
        setPrefillRole,
        prefillSeniority,
        setPrefillSeniority,
      }}
    >
      {children}
    </SalaryDataContext.Provider>
  );
}

export function useSalaryData() {
  const context = useContext(SalaryDataContext);
  if (!context) {
    throw new Error("useSalaryData must be used within a SalaryDataProvider");
  }
  return context;
}
