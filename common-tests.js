function commonTest(responsecode, time, contenttype) {
  //console.log(responsecode);
  if(responsecode===200||responsecode===201){
      it('should be a successful response', () => {
        response.ok.should.be.true;
        response.should.have.status(responsecode);
        response.statusType.should.equal(2);
        response.error.should.be.false;
      });
  }else if (responsecode===400 || responsecode===404){
      it('should be a unsuccessful response', () => {
        response.ok.should.be.false;
        response.should.have.status(responsecode);
        response.statusType.should.equal(4);
        response.error.should.be.true;
      });
  }
      
  it('should respond in a timely manner', () => {
      response.time.should.be.below(time);
  });
  
  if(contenttype.toLowerCase()==="application/json; charset=utf-8"){
      it('should return JSON', () => {
        response.should.be.json;
        response.should.have.header('Content-Type', contenttype);
        response.type.should.equal('application/json');
      });
  }else{
      it('should return JSON', () => {
        response.should.be.json;
        response.should.have.header('Content-Type', contenttype);
        response.type.should.equal('application/json');
      });
  }
}
