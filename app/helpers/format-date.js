import Ember from 'ember';

export function formatDate(params, day) {
  return moment(params[0]).format('DD');
}

export default Ember.Helper.helper(formatDate);
