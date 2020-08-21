/**
 * SUMMARY
 *   Ever want to have logs properly identify your child classes?
 *   Using the scope function from console++.js you can easily do just that
 *
 *  DETAILS
 *    Among other things, my console++.js gist adds the ability to scope console.*
 *    See https://gist.github.com/davfive/6f3484ec2aa3e883ce5d23874d135f6b
*/

/** file: human.js */
const speech = require('./console++')
const grunt = speech.scope('NEANDERTHAL').log

class Human {
  constructor({identifiesAs}={}) {
    grunt('Early human here. Arggg.')
    this.talk = (identifiesAs ? speech.scope(identifiesAs) : speech).log
  }
}

/** file: child.js */
// const Human = require('./human')
class Child extends Human {
  constructor() { super({identifiesAs: 'CHILD'}) }
  cry() { 
    this.talk('Acting like a child') 
  }                   
}

const child = new Child()
child.cry()