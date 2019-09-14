module.exports.logTeste = (app, req, res) => {
    res.status(200).json({
        message: "Teste OK!"
    });
}