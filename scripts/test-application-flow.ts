import assert from 'node:assert/strict';
import { canTransitionApplication } from '../lib/services/application-service';

assert.equal(canTransitionApplication('SUBMITTED', 'UNDER_REVIEW'), true);
assert.equal(canTransitionApplication('UNDER_REVIEW', 'APPROVED'), true);
assert.equal(canTransitionApplication('APPROVED', 'PAYMENT_PENDING'), true);
assert.equal(canTransitionApplication('PAYMENT_PENDING', 'ACTIVE'), true);
assert.equal(canTransitionApplication('SUBMITTED', 'ACTIVE'), false);
assert.equal(canTransitionApplication('REJECTED', 'PAYMENT_PENDING'), false);
assert.equal(canTransitionApplication('ACTIVE', 'APPROVED'), false);

console.log('Application state transition tests passed.');
