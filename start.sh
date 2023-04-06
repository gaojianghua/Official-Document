#!/bin/bash

RED_COLOR='\E[1;31m'  #红
GREEN_COLOR='\E[1;32m' #绿
YELOW_COLOR='\E[1;33m' #黄
BLUE_COLOR='\E[1;34m'  #蓝
PINK='\E[1;35m'      #粉红
RES='\E[0m'

echo -e  "${GREEN_COLOR}****NEXT项目：开始执行自动化部署****${RES}\n\n"

echo -e "${YELOW_COLOR}---step1:切换node版本---${RES}"
source ~/.nvm/nvm.sh
nvm install 16.0.0
if [ $? -ne 0 ]; then
    echo "下载node失败"
else
    nvm alias default 16.0.0
    if [ $? -ne 0 ]; then
        echo "设置默认node版本失败"
    else
        nvm use 16.0.0
        if [ $? -ne 0 ]; then
            echo "切换node版本失败"
        else
            echo -e "${BLUE_COLOR}切换成功${RES}\n"

            echo -e "${YELOW_COLOR}---step2:下载依赖包---${RES}"
            yarn
            if [ $? -ne 0 ]; then
                echo "下载依赖包失败"
            else
                echo -e "${BLUE_COLOR}下载完成${RES}\n"
                echo -e "${YELOW_COLOR}---step3:移除进程---${RES}"
                pm2 delete woflly-imprinting
                echo -e "${BLUE_COLOR}移除进程成功${RES}\n"
                echo -e "${YELOW_COLOR}---step4:启动项目---${RES}"
                pm2 start npm --name woflly-imprinting -- run start
                echo -e "${GREEN_COLOR}****部署成功****"
            fi
        fi
    fi
fi













