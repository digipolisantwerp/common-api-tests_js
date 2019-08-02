function commonTest(responseCode, contentType, time) {
  if (responseCode >= 200 && responseCode <= 399) {
      it('should be a successful response', () => {
          response.should.have.status(responseCode);
      });
  } else if (responseCode >= 400 && responseCode <= 599) {
      it('should be a unsuccessful response', () => {
          response.should.have.status(responseCode);
      });
  }

  if (time){
      it('should respond in a timely manner', () => {
          response.time.should.be.below(time);
      });
  }

  if (contentType){
      it('should return ' + contentType, () => {
          response.should.have.header('Content-Type', contentType);
      });
  }
}
function commonTestWithoutContentType(responseCode, time) {
    if (responseCode >= 200 && responseCode <= 399) {
        it('should be a successful response', () => {
            response.should.have.status(responseCode);
        });
    } else if (responseCode >= 400 && responseCode <= 599) {
        it('should be a unsuccessful response', () => {
            response.should.have.status(responseCode);
        });
    }
    
    if (time){
      it('should respond in a timely manner', () => {
          response.time.should.be.below(time);
      });
    }
}
function commonTestWithScheme(responseCode, contentType, time, jsonScheme) {
  if (responseCode >= 200 && responseCode <= 399) {
      it('should be a successful response', () => {
          response.should.have.status(responseCode);
      });
  } else if (responseCode >= 400 && responseCode <= 599) {
      it('should be a unsuccessful response', () => {
          response.should.have.status(responseCode);
      });
  }

  if (time){
      it('should respond in a timely manner', () => {
          response.time.should.be.below(time);
      });
  }

  if (contentType){
      it('should return ' + contentType, () => {
          response.should.have.header('Content-Type', contentType);
      });
  }
  
  if (jsonScheme){
    it('should match against a JSON Scheme', () => {
    // For more information about JSON Schema, see https://spacetelescope.github.io/understanding-json-schema/basics.html
        response.body.should.have.schema(jsonScheme);
    });
  }
}
function commonTestWithLocation(responseCode, contentType, location, time, jsonScheme) {
  if (responseCode >= 200 && responseCode <= 399) {
      it('should be a successful response', () => {
          response.should.have.status(responseCode);
      });
  } else if (responseCode >= 400 && responseCode <= 599) {
      it('should be a unsuccessful response', () => {
          response.should.have.status(responseCode);
      });
  }

  if (time){
      it('should respond in a timely manner', () => {
          response.time.should.be.below(time);
      });
  }

  if (contentType){
      it('should return ' + contentType, () => {
          response.should.have.header('Content-Type', contentType);
		  response.should.have.header('Location', location);
      });
  }
  
  if (jsonScheme){
    it('should match against a JSON Scheme', () => {
    // For more information about JSON Schema, see https://spacetelescope.github.io/understanding-json-schema/basics.html
        response.body.should.have.schema(jsonScheme);
    });
  }
}
