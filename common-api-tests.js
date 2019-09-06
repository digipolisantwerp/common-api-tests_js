// This library provides functions that are commonly used throughout the test process.
// For more information about JSON Schema, see https://spacetelescope.github.io/understanding-json-schema/basics.html

/**
 * Checks commonly used variables.
 *
 * @param {number} statusCode - status code of the response
 * @param {string} contentType - content type of the response
 * @param {Object} jsonSchema - JSON schema of the response
 * @param {string} location - location of the source
 */
function testCommon(statusCode, contentType, jsonSchema, location) {
	logResponseBody();
	statusCode && checkStatusCode(statusCode);
	contentType && checkContentType(contentType);
	jsonSchema && checkJSONSchema(jsonSchema);
	location && checkLocation(location);
}

/**
 * Executes functions testCommon and checkTime.
 *
 * @param {number} statusCode - status code of the response
 * @param {number} time - elapsed time of the response
 * @param {string} contentType - content type of the response
 * @param {Object} jsonSchema - JSON schema of the response
 * @param {string} location - location of the source
 */
function testCommonAndTime(statusCode, time, contentType, jsonSchema, location) {
	testCommon(statusCode, contentType, jsonSchema, location);
	time && checkTime(time);
}

/**
 * Logs the response body of the request. This function is for test automation logging purposes.
 */
function logResponseBody() {
	// The 'it' function is being used because a console log results in an unreadable small vertical text. This method will count as an extra test.
	it('response body: ' + responseBody, () => {});
}

/**
 * Generates a random number. Positive and negative numbers are allowed.
 *
 * @param {number} min - minimum number (included)
 * @param {number} max - maximum number (included)
 * @returns {number} Random number that ranges from min to max
 * @throws {Error} Parameters must be numbers
 */
function generateNumber(min, max) {
	if (typeof min == 'number' && typeof max == 'number') {
		if (min <= max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		} else {
			return Math.floor(Math.random() * (min - max + 1) + max);
		}
	} else {
		throw new Error('Parameter values must be of type \'number\' for function \'generateNumber(min, max)\'');
	}
}

/**
 * Generates a random string of characters.
 *
 * @param {number} length - Amount of characters to be generated
 * @returns {string} Text with random characters
 * @throws {Error} Parameter must be a number
 */
function generateString(length) {
	if (typeof length == 'number') {
		var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
			text = "";
		for (var i = 0; i < length; i++) {
			text += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return text;
	} else {
		throw new Error('Parameter value must be of type \'number\' for function \'generateString(length)\'');
	}
}

/**
 * Gets the index of the first object in an array that matches the given property and value.
 *
 * @param {Array.<Object>} array - The array to be searched
 * @param {string} property - The name of the property to be matched
 * @param {*} value - The value of the property to be matched
 * @returns {number} Index of the first matching object or -1 if there is no match
 * @throws {Error} Parameters must be an array, string, any
 */
function getIndexObjectInArray(array, property, value) {
	if (Array.isArray(array) && array.every(item => typeof item == 'object') && typeof property == 'string') {
		return array.findIndex(item => item[property] == value);
	} else {
		throw new Error('Parameter values must be of type \'Array.<Object>, string, any\' for function \'getIndexObjectInArray(array, property, value)\'');
	}
}

/**
 * Checks if the service responds within the required response time.
 *
 * @param {number} time - elapsed time of the response
 */
function checkTime(time) {
	if (time > 0) {
		it('should respond within ' + (time >= 1000 ? time/1000 + ' second(s)' : time + ' millisecond(s)'), () => {
			response.time.should.be.below(time);
		});
	} else {
		it('should be tested against a strictly positive time interval', () => {
			expect(false).to.be.true;
		});
	}
}

/**
 * Checks if the service responds with the correct status.
 *
 * @param {number} statusCode - code of the response status
 */
function checkStatusCode(statusCode) {
	switch (true) {
		case (100 <= statusCode && statusCode <= 199):
			it('should be an information response', () => {
				response.should.have.status(statusCode);
			});
			break;
		case (200 <= statusCode && statusCode <= 299):
			it('should be a successful response', () => {
				response.should.have.status(statusCode);
			});
			break;
		case (300 <= statusCode && statusCode <= 399):
			it('should be a redirection response', () => {
				response.should.have.status(statusCode);
			});
			break;
		case (400 <= statusCode && statusCode <= 499):
			it('should be a client error response', () => {
				response.should.have.status(statusCode);
			});
			break;
		case (500 <= statusCode && statusCode <= 599):
			it('should be a server error response', () => {
				response.should.have.status(statusCode);
			});
			break;
		default:
			it('should be tested against an existing status code', () => {
				expect(false).to.be.true;
			});
	}
}

/**
 * Checks if the service responds with the correct content type.
 *
 * @param {string} contentType - type of the response body
 */
function checkContentType(contentType) {
	it('should be of type \'' + contentType + '\'', () => {
		response.type.should.equal(contentType);
	});
}

/**
 * Checks if the response body is structured conform the defined JSON schema.
 *
 * @param {Object} jsonSchema - JSON schema of the response body
 */
function checkJSONSchema(jsonSchema) {
	if (typeof jsonSchema == 'object') {
		it('should match against the JSON schema', () => {
			response.body.should.have.schema(jsonSchema);
		});
	} else {
		it('should be tested against a JSON schema object', () => {
			expect(false).to.be.true;
		});
	}
}

/**
 * Checks if the service responds with the correct location.
 *
 * @param {string} location - location of the source
 */
function checkLocation(location) {
	it('should return the location \'' + location + '\'', () => {
		response.should.have.header('Location', location);
	});
}
