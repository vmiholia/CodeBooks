// Real CPT 93005 data extracted from print.htm
export const cpt93005Data = {
  code: "93005",
  
  officialDescriptor: "93005 - Electrocardiogram, routine ECG with at least 12 leads; tracing only, without interpretation and report",
  
  layDescription: {
    title: "Common Language Description",
    content: `An electrocardiogram (ECG) is used to evaluate the electrical activity of the heart. The test is performed with the patient lying prone on the exam table. Small plastic patches are attached at specific locations on the chest, abdomen, arms, and/or legs. Leads (wires) from the ECG tracing device are then attached to the patches. A tracing is obtained of the electrical signals from the heart. 

Electrical activity begins in the sinoatrial node, which generates an electrical stimulus at regular intervals, usually 60 to 100 times per minute. This stimulus travels through the conduction pathways to the sinoatrial node causing the atria to contract. The stimulus then travels along the bundle of His, which divides into right and left pathways providing electrical stimulation of the ventricles causing them to contract. Each contraction of the ventricles represents one heart beat. 

The ECG tracing includes the following elements: P wave, QRS complex, ST segment, and T wave. The P wave, a small upward notch in the tracing, indicates electrical stimulation of the atria. This is followed by the QRS complex, which indicates the ventricles are electrically stimulated to contract. The short flat ST segment follows and indicates the time between the end of the ventricular contraction and the T wave. The T wave represents the recovery period of the ventricles. 

The physician reviews, interprets, and provides a written report of the ECG recording taking care to note any abnormalities. Use 93000 to report the complete procedure, including ECG tracing with physician review, interpretation, and report; use 93005 to report the tracing only; and use 93010 to report physician interpretation and written report only.`,
    copyright: "©2015-2025 DecisionHealth - Plain English Descriptions - All Rights Reserved"
  },
  
  medicareFeesDE: {
    facility: "$6.08",
    nonFacility: "$6.08",
    medicare80Facility: "$##.##",
    medicare80NonFacility: "$4.87",
    patientPaysNonFacility: "$1.22",
    nonParticipatingAllowed: "$5.78",
    nonParticipatingMedicare80: "$4.62",
    nonParticipatingPatientPays: "$1.16",
    limitingCharge: "$6.65"
  },
  
  relatedCodes: {
    guidelines: [
      { code: "99418", description: "For ECG monitoring" },
      { note: "Do not report 93000, 93005, 93010 in conjunction with 0525T-0532T (intracardiac ischemia monitoring system codes)" }
    ],
    relatedECGCodes: [
      { code: "93000", description: "Electrocardiogram, routine ECG with at least 12 leads; with interpretation and report" },
      { code: "93005", description: "Electrocardiogram, routine ECG with at least 12 leads; tracing only, without interpretation and report" },
      { code: "93010", description: "Electrocardiogram, routine ECG with at least 12 leads; interpretation and report only" },
      { code: "93040", description: "Rhythm ECG, 1-3 leads; with interpretation and report" },
      { code: "93041", description: "Rhythm ECG, 1-3 leads; tracing only without interpretation and report" },
      { code: "93042", description: "Rhythm ECG, 1-3 leads; interpretation and report only" }
    ],
    crossReferences: [
      { code: "94621", context: "Cardiopulmonary exercise testing - do not report with ECG codes during same session" },
      { code: "0180T", context: "64+ lead ECG codes (deleted) - use 93799 for unlisted cardiovascular service" }
    ]
  },
  
  ncci: {
    mue: {
      unitsOfService: "5",
      adjudicationIndicator: "3 Date of Service Edit: Clinical",
      rationale: "Clinical: Data",
      note: "Additional units are unlikely, an appeal will be necessary."
    },
    ptpColumn2Codes: [
      { code: "0543T", modifier: "1" },
      { code: "0544T", modifier: "1" },
      { code: "0545T", modifier: "1" },
      { code: "0573T", modifier: "1" },
      { code: "0574T", modifier: "1" },
      { code: "0580T", modifier: "1" },
      { code: "20561", modifier: "1" },
      { code: "20700", modifier: "1" },
      { code: "20701", modifier: "1" },
      { code: "21603", modifier: "1" },
      { code: "33017", modifier: "1" },
      { code: "33018", modifier: "1" },
      { code: "34718", modifier: "1" },
      { code: "35702", modifier: "1" },
      { code: "93041", modifier: "1" },
      { code: "93042", modifier: "1" }
    ]
  },
  
  icd10CMCrosswalks: [
    {
      category: "Obesity & Metabolic",
      codes: [
        { code: "E66.01", description: "Morbid (severe) obesity due to excess calories" },
        { code: "E66.09", description: "Other obesity due to excess calories" },
        { code: "E66.1", description: "Drug-induced obesity" },
        { code: "E66.2", description: "Morbid (severe) obesity with alveolar hypoventilation" },
        { code: "E66.3", description: "Overweight" },
        { code: "E66.9", description: "Obesity, unspecified" }
      ]
    },
    {
      category: "Cardiovascular Conditions",
      codes: [
        { code: "I42.0", description: "Dilated cardiomyopathy" },
        { code: "I42.1", description: "Obstructive hypertrophic cardiomyopathy" },
        { code: "I42.2", description: "Other hypertrophic cardiomyopathy" },
        { code: "I45.81", description: "Long QT syndrome" },
        { code: "I49.8", description: "Other specified cardiac arrhythmias" },
        { code: "I49.9", description: "Cardiac arrhythmia, unspecified" }
      ]
    },
    {
      category: "Genetic Syndromes",
      codes: [
        { code: "Q87.40", description: "Marfan syndrome, unspecified" },
        { code: "Q87.410", description: "Marfan syndrome with aortic dilation" },
        { code: "Q87.418", description: "Marfan syndrome with other cardiovascular manifestations" },
        { code: "Q87.42", description: "Marfan syndrome with ocular manifestations" },
        { code: "Q87.43", description: "Marfan syndrome with skeletal manifestation" }
      ]
    },
    {
      category: "Symptoms & Signs",
      codes: [
        { code: "R00.2", description: "Palpitations" },
        { code: "R01.0", description: "Benign and innocent cardiac murmurs" },
        { code: "R01.1", description: "Cardiac murmur, unspecified" },
        { code: "R03.0", description: "Elevated blood-pressure reading, without diagnosis of hypertension" },
        { code: "R53.83", description: "Other fatigue" },
        { code: "R55", description: "Syncope and collapse" }
      ]
    },
    {
      category: "Encounters & Examinations",
      codes: [
        { code: "Z00.00", description: "Encounter for general adult medical examination without abnormal findings" },
        { code: "Z00.01", description: "Encounter for general adult medical examination with abnormal findings" },
        { code: "Z00.121", description: "Encounter for routine child health examination with abnormal findings" },
        { code: "Z00.129", description: "Encounter for routine child health examination without abnormal findings" }
      ]
    },
    {
      category: "BMI Classifications",
      codes: [
        { code: "Z68.25", description: "Body mass index [BMI] 25.0-25.9, adult" },
        { code: "Z68.30", description: "Body mass index [BMI]30.0-30.9, adult" },
        { code: "Z68.35", description: "Body mass index [BMI] 35.0-35.9, adult" },
        { code: "Z68.41", description: "Body mass index [BMI]40.0-44.9, adult" },
        { code: "Z68.45", description: "Body mass index [BMI] 70 or greater, adult" }
      ]
    },
    {
      category: "Family History",
      codes: [
        { code: "Z82.41", description: "Family history of sudden cardiac death" },
        { code: "Z82.49", description: "Family history of ischemic heart disease and other diseases of the circulatory system" },
        { code: "Z84.81", description: "Family history of carrier of genetic disease" }
      ]
    }
  ],
  
  cptAssistantArticles: [
    { year: "2020", title: "Pulmonary Diagnostic Testing and Therapies Services 2021 Update", month: "December 2020" },
    { year: "2017", title: "Pulmonary Diagnostic Testing and Therapies", month: "October 2017" },
    { year: "2016", title: "Evaluation and Management: Hospital Inpatient Services (Q&A)", month: "April 2016" },
    { year: "2004", title: "Additional Coding Changes to the Category III Codes", month: "July 2004" }
  ],
  
  ahaCodingClinicArticles: [
    { year: "2024", title: "For Your Information: New CPT Category III codes", month: "2024" },
    { year: "2024", title: "For Your Information: New and Revised CPT Category III Codes", month: "2024" },
    { year: "2015", title: "Bundling/unbundling caution is essential for accurate coding and reporting", month: "2015" },
    { year: "2004", title: "CMS further defines observation care", month: "2004" },
    { year: "2002", title: "FOR your INFORMATION: Observation services, HCPCS, and APC's", month: "2002" }
  ]
};

export default cpt93005Data; 