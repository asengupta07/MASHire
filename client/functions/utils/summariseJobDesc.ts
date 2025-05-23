import { parseUntilJson } from "../parser/parseUntilJson";
import { generate } from "../responseGenerator/generateBackup";
import { PromptTemplate } from "@langchain/core/prompts";


export const summariseJobDescription = async (jobDescription: string) => {
    const promptTemplate = `You are a professional HR analyst. Analyze the following job description and extract the key elements in a structured format.
        
        Job Description:
        {{jobDescription}}
        
        Please provide a comprehensive analysis with the following sections:
        1. Job Title (the main position title)
        2. Required Skills (list all technical and soft skills)
        3. Required Experience (years and specific types of experience)
        4. Required Qualifications (education, certifications, licenses)
        5. Job Responsibilities (key duties and expectations)
        6. Key Requirements (any other critical requirements)
        7. Company Information (extract any details about the company)
        8. Job Location and Type (remote/hybrid/onsite, full-time/part-time)
        9. Job Settings (application deadline, max candidates, interview time slots)

        Your response should be a JSON object in the following format:
        {
            "jobTitle": "extracted job title from the description",
            "name": "name of the company if present, otherwise null",
            "website": "website of the company if present, otherwise null",
            "industry": "industry of the company if present, otherwise null",
            "size": "size of the company if present, otherwise null",
            "founded": "founded year of the company if present, otherwise null",
            "description": "description of the company if present, otherwise null",
            "requiredSkills": [
                "skill1",
                "skill2",
                "skill3",
                ...
            ],
            "requiredExperience": "string containing years and specific types of experience",
            "requiredQualifications": [
                "education",
                "certifications",
                "licenses",
                ...
            ],
            "jobResponsibilities": [
                "responsibility1",
                "responsibility2",
                "responsibility3",
                ...
            ],
            "keyRequirements": [
                "requirement1",
                "requirement2",
                "requirement3",
                ...
            ],
            "companyInformation": [
                "information1",
                "information2",
                "information3",
                ...
            ],
            "jobLocationAndType": {
                "location": "location of the job",
                "type": "remote/hybrid/onsite",
                "time": "full-time/part-time"
            },
            "applicationDeadline": "ISO date string for application deadline",
            "maxCandidates": "number of maximum candidates",
            "interviewTimeSlots": [
                {
                    "startTime": "ISO date string for slot start time",
                    "endTime": "ISO date string for slot end time",
                    "isAvailable": true
                }
            ]
        }

        Instructions:
        - Extract the job title carefully from the description, ensuring it's the main position being advertised
        - For the company information, extract the vision, mission, and values if present, otherwise any information about the company. Each element of the list should be a complete sentence in natural language.
        - For settings, if not explicitly mentioned in the job description:
          - Set application deadline to 30 days from now
          - Set max candidates to 10
          - Do not include interview time slots as these should be set by the recruiter

        Format the output as a JSON object with these keys. Ensure all extracted information is specific and detailed.`;

    const template = new PromptTemplate({
        template: promptTemplate,
        inputVariables: ['jobDescription'],
        templateFormat: 'mustache'
    });
    
    const prompt = await template.format({ jobDescription });

    const response = await generate(prompt);

    const parsedResponse = parseUntilJson(response);

    return parsedResponse;
}