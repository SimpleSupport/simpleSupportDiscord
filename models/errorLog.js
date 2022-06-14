const { DataTypes, Model } = require("sequelize");

module.exports = class error extends Model {
    static init (sequelize) {
        return super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            authorId: { type: DataTypes.STRING },
            error: { type: DataTypes.STRING },
            command: { type: DataTypes.STRING },
        }, {
            tableName: 'errorLog',
            timestamps: true, 
            sequelize
        });
    };
};