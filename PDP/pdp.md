## 中華電信PDP 決策引擎

請參考中華電信相關文件說明

NodeJS 建立

## published on docker 

如果還未安裝docker 環境：
https://docs.docker.com/engine/install/ubuntu/

express 同步套件: nodemon

1. create image 
```
    docker build -t cht_pdp . 
```
2. run docker 同步變數(注意目錄相對位置)
```
    docker run -d -p 3000:3000 -v ./:/chtpdp cht_pdp
```