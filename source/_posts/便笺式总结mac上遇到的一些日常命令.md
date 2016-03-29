title: 便笺式总结mac上遇到的一些日常命令
date: 2015-09-03 22:43:02
tags: [mac, 便笺, linux, git, svn]
---
## 有关系统辅助的一些SHELL
- 查找相关
```shell
查找目录：find /（查找范围） -name '查找关键字' -type d
查找文件：find /（查找范围） -name 查找关键字 -print
```

- SSH
```shell
/etc/init.d/sshd start
ssh username@ipaddr
```

- FIREWALL
```shell
sudo  /etc/init.d/iptables status
```

<!-- more -->

- Port
```shell
lsof -n -P | grep 9090
ps -ef | grep nginx
```

- Tar File
```shell
tar zcvf h5m_agent.tar.gz h5m_agent
zip h5m.zip h5m/*
zip -r h5m.zip h5m/  //会带DS_store
```

- COPY & BACKUP
```shell
cp -r /dir/file /dest
scp -p port user@serverip:/home/user/filename /home/user/filename
mv file filedest
```

- Memory
```shell
df -h
grep MemTotal /proc/meminfo # 查看内存总量 
# grep MemFree /proc/meminfo # 查看空闲内存量 
```

- CHMOD
```shell
sudo chmod -R 777  /home/mypackage       # Grant File 
sudo chown -R shaofengliu /home/mypackage # Grant File UserGroup
```


## GIT
```shell
git status --untracked-files=no
```

- 忽略已跟踪的文件
```shell
git update-index --assume-unchanged filename

- 撤销用：
git update-index --no-assume-unchanged filename
git rm --cached logs/xx.log不再追踪 
```

- 删除已入仓库的文件夹
```shell
git rm -r --cached .idea/
git commit -m 'x'
$ git reflog master
3b4946a master@{0}: merge origin/master
9187e70 master@{1}: xxxxxxx
3b4946a master@{2}: yyyyyyy
$ git push -u origin master -f 
git reflog master
586  git reset --hard master@{1}

git ls-files -u #查看冲突的文件
git push -u origin master -f # 
git checkout -b iss53 #创建并切换到新分支
git commit -am added a new footer [issue 53]
git branch -r #获取远程分支信息
git branch -l #获取本地分支信息
git remote
git checkout --track origin/test  #将远程分支获取为本地分支
```

## SVN
SVN:
```shell
svn copy trunk branches/app3
svn merge -r 14:15 /data/code/xcut/trunk/
```

## NPM

- 获取、设置、查看config相关项
```shell
npm config get key
npm config set key value #sudo npm config set registry http://registry.cnpmjs.org/  --global
npm config ls -l
```



## nginx
- 重启nginx
```shell
sudo /usr/local/nginx/sbin/nginx -s reload
```

- 关闭nginx
```shell
sudo pkill -9 nginx
```

## Apache
- 操作
sudo apachetcl start/restart/stop

- 所在目录
```shell
/private/etc/apache2/
```

## PHP
-所在目录
```shell
/usr/include/php/
```

- php-fpm
```shell
sudo php-fpm
sudo pkill -9 php-fpm
/usr/local/php/sbin/php-fpm (linux)
```

## Mysql
```shell
/etc/my.cnf 主配置文件
/ver/lib/mysql   mysql数据库的数据库文件存放位置
/var/log mysql数据库的日志
//wp mysql 流程

/Users/shaofengliu/IT/php/JoecoraPhp/wp-content/themes/twentyfourteen/public
#mysql控制：
/etc/rc.d/init.d/mysqld
1.登录：mysql -uroot -p //root
2.建库：create database joecora
3.用户：grant select,insert,update,delete on *.* to joecora@"%" Identified by "password"
4.进库：use joecora; set names utf8;
5.导入：source /home/data/php/JoecoraPhp/data/joecora_joe.sql;
```
## vagrant
```shell
vagrant box add base centos65.box
vagrant box list
vagrant init {boxname}
vagrant up {boxname}
vagrant halt
vagrant reload
vagrant package --output nginxphp.box
VBoxManage list vms
```

## SHELL快捷键
1、将光标移动到行首：ctrl + a
2、将光标移动到行尾：ctrl + e
3、清除屏幕：       actrl + l
4、搜索以前使用命令：ctrl + r
5、清除当前行：     ctrl + u
6、清除至当前行尾：  ctrl + k
7、单词为单位移动：option + 方向     
8、水平分隔当前标签页： Command + D
9、向左/向右切换标签： Command + shift + { 或 }
10、 -history

## hexo
```shell
hexo deploy -g  #生成加部署
hexo server -g  #生成加预览
hexo clean
#命令的简写为：
hexo n == hexo new
hexo g == hexo generate
hexo s == hexo server
hexo d == hexo deploy
```