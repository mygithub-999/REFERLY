const { getRandomValues } = require('crypto');
// const fs = require('fs');
// const path = require('path');
const { v4: uuid } = require('uuid');
const mongoose=require('mongoose');
const referralsDB=require('../model/referrals');
const referrals = require('../model/referrals');
// const dataPath = path.join(__dirname, '..', 'model', 'referrals.json');

// const loadReferrals = () => {
//   if (!fs.existsSync(dataPath)) return [];
//   const data = fs.readFileSync(dataPath);
//   return JSON.parse(data);
// };

const saveReferrals = async(referrals) => {
  await referrals.save();
};

const saveReferral =async(req, res) => {
  console.log('Decoded user from token:', req.user);
  console.log('URL param userId:', req.params.userId);
  const { userId } = req.params;
  console.log('req.body:', req.body);

  const {appname_code}=req.body;
  const index = appname_code.indexOf(':');
  const appname = appname_code.substring(0, index).trim().toLowerCase();
  const code = appname_code.substring(index + 1).trim();
  const duplicate1=await referralsDB.findOne({code:code});
  const duplicate2=await referralsDB.findOne({appname:appname});
  console.log(`Code: ${code}`);
  console.log(`Appname: ${appname}`);
  if (duplicate1 && duplicate2) {
    console.log(`Duplicate EXISTS!!`);
    return res.status(301).json({message:'You cannot upload the same referral more than ONCE'})
  }
  // if(!code && !appname) return res.status(400).json({message: '{Application Name}: {Referral Code} required'})
  if (!code) return res.status(400).json({ message: 'Referral code required in following format  Appname: Code' });
  if (!appname) return res.status(400).json({ message: 'Application name required' });
  const newRef =await referralsDB.create({
    userId:userId,
    appname:appname,
    code: code,
    createdAt: new Date().toISOString(),
    uses: 0, 
    maxUses: 5
  })
  res.status(201).json({ message: 'Referral saved', referral: newRef });
};

const getRandomReferral=async(req,res)=>{
  const { appname }=req.body;
  const filtered = await referralsDB.find(
    {appname:appname}
  );

  if(!appname || appname.trim()===""){
    res.status(401).json({message:'Application Name Field Empty'});
    return;
  }

  if (!filtered) {
    return res.status(404).json({ message: 'No referral codes available for this app' });
  }

  const index=Math.floor(Math.random() * filtered.length);
  const selected=filtered[index];
  // const index=Math.floor(Math.random()*filtered.length);
  // const selected=filtered[index];

  // selected.uses+=1;
  // saveReferrals(referrals);
  // console.log(selected.code);
  console.log('Filtered: ',selected.code);
  res.status(200).json({
    mainCode: selected.code,
    usesLeft: selected.maxUses - selected.uses
  });
}



module.exports = { saveReferral,getRandomReferral };
