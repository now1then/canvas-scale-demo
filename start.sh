#!/bin/bash
    # 激活node环境(必须写)
    source /home/admin/.nvm/nvm.sh
    # 容器的启动
    pm2-runtime start pm2.json
