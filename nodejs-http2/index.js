'use strict';
const http = require('http');
const pug = require('pug');
const server = http
  .createServer((req, res) => {
　　　　console.info('Requested by ' + req.connection.remoteAddress);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });

    switch (req.method) {
      case 'GET':
        if (req.url === '/'){
          res.write('<!DOCTYPE html><html lang="ja"><body>' +
          '<h1>ご注文申し込みフォーム</h1>'+
          '<a href="/applicationForm">申し込み内容一覧</a>'+
          '</body></html>');
        }
        else if (req.url === '/applicationForm') {
          res.write('<!DOCTYPE html><html lang="ja"><body>' +
          '<h1>申し込み内容一覧</h1><ul>'+
          '<li><a href="/application/syokuhin">食品</a></li> '+
          '<li><a href="/application/sonohoka">その他(準備中)</a></li> '+
          '</jl></body></html>');
      } else if (req.url === '/applicationForm/shokuhin') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: '海苔',
              secondItem: 'みそ',
              thirdItem: 'しょうゆ',
              fourthItem: 'スパイス',
              fifthItem: '5-ALA',
              sixthItem: 'ビタミンC',
              seventhItem: '食べられる重曹',
              eighthItem: '食べられるクエン酸',
              ninethItem: '',
              tenthItem: ''
            })
          );
        } else if (req.url === '/applicationForm/sonohoka') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: '',
              secondItem: '',
              thirdItem: '',
              fourthItem: '',
              fifthItem: '',
              sixthItem: '',
              seventhItem: '',
              eighthItem: '',
              ninethItem: '',
              tenthItem: ''
            })
          );
        }
        res.end();
        break;
      case 'POST':
        let rawData = '';
        req.on('data', chunk => {
            rawData = rawData + chunk;
          }).on('end', () => {
            const qs = require('querystring');
            const answer = qs.parse(rawData);
            const body = `${answer['chiiki']}の
              ${answer['ニックネーム']}さんが<br>
              ${answer['favorite']}<br>
              をお選びくださいました。<br>
              その他のご要望:「${answer['iken']}」<br>
              **************************************<br>
              承りました<br>誠にありがとうございました！`;
            console.info(body);
            res.write('<!DOCTYPE html><html lang="ja"><style>body{background-color:HoneyDew}</style><body><h1 align="center">' +
              body + '</h1></body></html>');//HoneyDew(#F0FFF0)
            res.end();
          });
        break;
      default:
        break;
    }
  })
  .on('error', e => {
    console.error('Server Error', e);
  })
  .on('clientError', e => {
    console.error('Client Error', e);
  });
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.info('Listening on ' + port);
});