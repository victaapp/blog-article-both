install:
	npm install

run: install
	nohup node . & 

stop:
	-kill -9 $$(lsof -t -i:3000)