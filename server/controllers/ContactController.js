import User from "../models/UserModel.js"

export const searchContacts = async (request, response, next) => {
    try {
        const {searchTerm} = request.body;

        if(searchTerm === undefined || searchTerm === null){
            return response.status(400).send("Search Term is required!");
        }

        const sanitizedSearchTerm = searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const negex = new RegExp(sanitizedSearchTerm, 'i');

        const contacts = await User.find({
            $and : [{_id: {$ne: request.userId}},
                {
                    $or: [{firstName: negex}, {lastName: negex}, {email: negex}],
                },
            ],
        });

        return response.status(200).json({contacts});
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal server error !");        
    }
};