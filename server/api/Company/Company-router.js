const router = require("express").Router();
const Company = require("./Company-models");
const mw = require("./Company-middleware");
const jwt = require("../jwtverify");

router.post(
  "/addcompany",
  jwt,
  mw.inputParameterCheck,
  mw.dbLegalNumberCheck,
  async (req, res, next) => {
    try {
      await Company.addCompany(req.body);
      return res.status(200).json({ message: "Kayıt oluşturuldu" });
    } catch (error) {
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  }
);

router.get("/getcompany", jwt, async (req, res, next) => {
  try {
    const data = await Company.getCompanies();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
});
router.post("/getidcompany", jwt, async (req, res, next) => {
  try {
    const data = await Company.getIdCompany(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
});
router.post("/editcompany", jwt, async (req, res, next) => {
  try {
    const { id, companyValue } = req.body;
    const data = await Company.editCompany(id, companyValue);
    return res.status(200).json({ message: "Kayıt Düzenlendi" });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
});
router.post("/deletecompany", jwt, async (req, res, next) => {
  try {
    await Company.deleteCompany(req.body.id);
    return res.status(200).json({ message: "Kayıt silindi" });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
});
module.exports = router;
