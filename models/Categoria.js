

module.exports = (sequelize, DataTypes)=>{
    const Categoria = sequelize.define('Categoria',{
        
        nome: DataTypes.string,
        descricao: DataTypes.string,
        

        
    },{
        tableName: 'categoria',
        timestamps: false
    })
        return Categoria;
}