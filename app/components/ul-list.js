import Ember from 'ember';

export default Ember.Component.extend({
  willRender() {
    this.set('list',[
      {"key" : "tel:"}, {"key" : "(+359) 0721 66944"},
      {"key" : "gsm:"}, {"key" : "(+359) 0889 81 20 27"},
      {"key" : "email:"}, {"key" : "atzoleva@abv.bg"},
      {"key" : "skype:"}, {"key" : "anna_tzoleva"},
      {"key" : "address:"}, {"key" : "гр.Костинброд ул.'Христо Ботев'16"}]);
      console.log(this.list);
    }
});
