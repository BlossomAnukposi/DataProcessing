const database = require("../../config/database");
const ModelParent = require("./modelParent");

class ProfileModel extends ModelParent
{
    constructor()
    {
        super("profile");
    }

    async createProfile(accountId, profileName, dateOfBirth, profilePicture = null, profileLanguage = "English")
    {
        try {
            const result = await database.query(
                'SELECT * FROM public.create_profile($1, $2, $3, $4, $5)',
                [accountId, profileName, dateOfBirth, profilePicture, profileLanguage]
            );

            if (!result?.length) {
                console.log(`Could not create profile.`);
                return null;
            }

            return result;
        } catch (error) {
            console.error('Detailed error in createProfile:', error);
            this.handleError('creating profile', error);
        }
    }

    async getProfilesByAccount(accountId)
    {
        try {
            const result = await database.query(
                'SELECT * FROM public.get_profiles_by_account($1)',
                [accountId]
            );

            if (!result?.length) {
                console.log(`No profile found for account ID ${accountId}.`);
                return null;
            }
            return result;
        }
        catch (error) {
            console.error('Detailed error in getProfileByAccount:', error);
            this.handleError('retrieving profile by account', error);
        }
    }

    async updateProfile(profileId, profileName = null, dateOfBirth = null, profilePicture = null, profileLanguage = null)
    {
        try {
            console.log('Updating profile:', {
                profileId,
                profileName: profileName? 'provided' : 'not provided',
                dateOfBirth: dateOfBirth? 'provided' : 'not provided',
                profilePicture: profilePicture? 'provided' : 'not provided',
                profileLanguage: profileLanguage? 'provided' : 'not provided',
            });

            const result = await database.query(
                'SELECT * FROM public.update_profile($1, $2, $3, $4, $5)',
                [profileId, profileName, dateOfBirth, profilePicture, profileLanguage]
            );

            console.log('Result from database:', result);

            if (!result || result.length === 0) throw new Error('Profile not found');

            return result[0];
        }
        catch (error)
        {
            console.error('Detailed error in updateProfile:', error);
            console.error('Error stack:', error.stack);
            this.handleError('updating profile', error);
        }
    }
}

module.exports = new ProfileModel();