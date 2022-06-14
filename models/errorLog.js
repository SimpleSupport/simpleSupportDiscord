const { DataTypes, Model } = require("sequelize");

module.exports = class error extends Model {
    static init (sequelize) {
        return super.init({
            ticketId: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            authorId: { type: DataTypes.STRING },
            error: { type: DataTypes.STRING },
        }, {
            tableName: 'errorLog',
            timestamps: true, 
            sequelize
        });
    };
};