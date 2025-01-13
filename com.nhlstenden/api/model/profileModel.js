const database = require("../../config/database");
const ModelParent = require("./modelParent");

class ProfileModel extends ModelParent {
    constructor() {
        super("profile");
    }

    async createProfile(accountId, profileName, dateOfBirth, profilePicture, profileLanguage = "English") {
        try {
            console.log('Creating profile with the following details:', {
                accountId,
                profileName,
                dateOfBirth,
                profilePicture: profilePicture || "default",
                profileLanguage
            });

            const result = await database.query(
                'SELECT * FROM public.create_profile($1, $2, $3, $4, $5)',
                [accountId, profileName, dateOfBirth, profilePicture, profileLanguage]
            );

            if (!result?.length) {
                console.error(`Could not create profile.`);
                return null;
            }

            console.log('Profile created successfully:', result);
            return result;
        } catch (error) {
            console.error('Error in createProfile:', error.message);
            throw new Error(`Error creating profile: ${error.message}`);
        }
    }

    async getProfilesByAccount(accountId) {
        try {
            const result = await database.query(
                'SELECT * FROM public.get_profiles_by_account($1)',
                [accountId]
            );

            if (!result?.length) {
                console.error(`No profiles found for account ID ${accountId}.`);
                return null;
            }

            return result;
        } catch (error) {
            console.error('Error in getProfilesByAccount:', error.message);
            throw new Error(`Error retrieving profiles: ${error.message}`);
        }
    }

    async updateProfile(profileId, profileName = null, dateOfBirth = null, profilePicture = null, profileLanguage = null) {
        try {
            const result = await database.query(
                'SELECT * FROM public.update_profile($1, $2, $3, $4, $5)',
                [profileId, profileName, dateOfBirth, profilePicture, profileLanguage]
            );

            if (!result?.length) {
                console.error(`Profile with ID ${profileId} not found.`);
                return null;
            }

            return result[0];
        } catch (error) {
            console.error('Error in updateProfile:', error.message);
            throw new Error(`Error updating profile: ${error.message}`);
        }
    }
}

module.exports = new ProfileModel();
