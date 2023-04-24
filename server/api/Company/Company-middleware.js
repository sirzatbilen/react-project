const Company = require("./Company-models");

function inputParameterCheck(req, res, next) {
  const {
    company_name,
    company_legalnumber,
    company_country,
    company_website,
  } = req.body;
  if (
    !company_name ||
    !company_legalnumber ||
    !company_country ||
    !company_website
  ) {
    return res.status(400).json({ message: "Eksik alan bırakmayınız" });
  } else {
    next();
  }
}

async function dbLegalNumberCheck(req, res, next) {
  try {
    const legalNumber = await Company.dbCompanyCheck({
      company_legalnumber: req.body.company_legalnumber,
    });
    if (legalNumber) {
      return res
        .status(400)
        .json({ message: "Bu şirket numarasıyla kayıt vardır" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ message: "Sunucu bağlanma hatası" });
  }
}

module.exports = { inputParameterCheck, dbLegalNumberCheck };
