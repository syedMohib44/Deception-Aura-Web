export interface AddOwnerDto {
    firstName: string;
    lastName: string;
    username: string;
    profilePic?: Express.Multer.File;
    businessName: string;
}

export interface AddOwnerWithCardDto extends AddOwnerDto {
    card: {
        number: string;
        /**
         * Format: MMYYYY, Example: 022020
         */
        expiry: string;
        security_code: string;
        // name?: string;
    };
}
