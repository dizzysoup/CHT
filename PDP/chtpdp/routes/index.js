var express = require('express');
var router = express.Router();
const ldap = require('ldapjs');
const fs = require('fs');
const forge = require('node-forge');
const tls = require('tls');
const dns = require('dns');



const baseDN = 'DC=poc,DC=com';
const searchBase = 'CN=userID,CN=Users,DC=poc,DC=com';

const certFilePath = './crt/winsrv.poc.com.p12';;
const certPassword = '12345678'; 


function LDAPConnect(){
  return new Promise((resolve, reject) => {
    const ldapUrl = 'ldap://140.125.32.66';
    const ldapBindDN = 'M11217063';
    const ldapPassword = '1qaz@WSX3edc';
    const ldapClient = ldap.createClient({ url: ldapUrl });

    ldapClient.bind(ldapBindDN, ldapPassword, (err) => {
      if (err) {
        console.error('LDAP authentication failed:', err);
        reject('Authentication failed');
      } else {
        console.log('LDAP authentication successful');
        resolve('Authentication successful');
      }
    });
  });
}

// 資安院RP 介接
function LDAPsConnect(){
  return new Promise((resolve, reject) => {
    const ldapUrl = 'ldaps://winsrv.poc.com';
   // const ldapUrl = 'ldaps://192.168.166.21';
    const ldapBindDN = 'ldapop';
    const ldapPassword = '1qaz@WSX3edc';
    const key = fs.readFileSync('./crt/privatekey.pem');
    const cert = fs.readFileSync('./crt/certificate.pem');
    const ca = fs.readFileSync('./crt/NCCST_LAB_Root_CA.crt');

    const ldapClient = ldap.createClient({ 
      tlsOptions: {      
        ca : ca ,
        rejectUnauthorized: true
     },url: ldapUrl });

    ldapClient.bind(ldapBindDN, ldapPassword, (err) => {
      if (err) {
        console.error('LDAP authentication failed:', err);
        reject({ error: err });
      } else {
        console.log('LDAP authentication successful');
        resolve('Authentication successful');
      }
    });
  });
}

/*
console.log('成功连接到 LDAP 服务器');

    // 构建 LDAP 查询选项
    const opts = {
      filter: `(objectclass=*)`,
      scope: 'sub'
    };

    // 在指定的 Search Base 中搜索用户
    client.search(searchBase, opts, (err, searchRes) => {
      if (err) {
        console.error('LDAP 搜索失败:', err);
        return;
      }

      searchRes.on('searchEntry', (entry) => {
        console.log('用户信息:', entry.object);
      });

      searchRes.on('error', (err) => {
        console.error('LDAP 搜索错误:', err);
      });

      searchRes.on('end', () => {
        // 完成搜索后关闭 LDAP 连接
        client.unbind((err) => {
          if (err) {
            console.error('LDAP 断开连接失败:', err);
            return;
          }
          console.log('成功关闭 LDAP 连接');
        });
      });
    });
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PDP' });
});


router.post('/ldap', async function(req, res, next) {
  try {
    const result = await LDAPConnect();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/ldaps', async function(req, res, next) {
  try {
    const result = await LDAPsConnect();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
