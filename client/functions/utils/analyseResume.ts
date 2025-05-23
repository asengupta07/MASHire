import { PromptTemplate } from "@langchain/core/prompts";
import { generate } from "../responseGenerator/generateBackup";
import { parseUntilJson } from "../parser/parseUntilJson";

export const analyseResume = async (resume: string) => {
    const promptTemplate = `You are a professional resume analyst. Analyze the following resume and extract comprehensive information.
        
        Resume Content:
        {{resume_text}}
        
        Please provide a detailed analysis with the following sections:
        1. Education (institutions, degrees, majors, graduation dates, GPA if available)
        2. Work Experience (company names, positions, dates, key responsibilities, achievements)
        3. Skills (technical skills, soft skills, tools, languages)
        4. Certifications (names, issuing organizations, dates)
        5. Key Achievements (quantifiable accomplishments)
        6. Projects (if any, with technologies used and outcomes)
        7. Miscellaneous Information (if any, with any other information)
        8. Contact Information (email, phone, location)

        Your response should be a JSON object in the following format:
        {
            "education": [
                {
                    "institution": "name of the institution (if available)",
                    "degree": "degree (if available)",
                    "major": "major (if available)",
                    "graduationDate": "graduation date (YYYY-MM-DD) if available",
                    "gpa": "gpa if available"
                }
            ],
            "workExperience": [
                {
                    "company": "name of the company",
                    "position": "position",
                    "dates": "dates (YYYY-MM-DD) if available",
                    "keyResponsibilities": "list of key responsibilities",
                    "achievements": "list of achievements"
                }
            ],
            "skills": ["skill 1", "skill 2", "skill 3", ...],
            "certifications": ["certification 1", "certification 2", "certification 3", ...],
            "keyAchievements": ["achievement 1", "achievement 2", "achievement 3", ...],
            "miscellaneous": ["miscellaneous 1", "miscellaneous 2", "miscellaneous 3", ...],
            "projects": [
                {
                    "name": "name of the project",
                    "points": ["point 1", "point 2", "point 3", ...]
                }
            ],
            "contactInformation": {
                "email": "email",
                "phone": "phone",
                "location": "location"
            }
        }
        Format the output as a JSON object with these keys. Ensure all extracted information is specific and detailed.`;

    const template = new PromptTemplate({
        template: promptTemplate,
        inputVariables: ['resume_text'],
        templateFormat: 'mustache'
    });

    const prompt = await template.format({ resume_text: resume });

    const response = await generate(prompt);

    const parsedResponse = parseUntilJson(response);

    return parsedResponse;
}