const { DataTypes, Model } = require("sequelize");

module.exports = class devConfig extends Model {
    static init (sequelize) {
        return super.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            argument1: { type: DataTypes.STRING },
            argument2: { type: DataTypes.STRING },

        }, {
            tableName: 'mainConfig',
            timestamps: true, 
            sequelize
        });
    };
};