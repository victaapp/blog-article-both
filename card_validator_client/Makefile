install:
	npm install

run: install
	nohup npm start & 

stop:
	-kill -9 $$(lsof -t -i:3000)