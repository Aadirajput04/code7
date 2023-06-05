import {
    SSR
} from '~/utils/constants.js'

export const getClientReferenceId = () => {
    return !SSR && window ? .Rewardful && window.Rewardful ? .referral || ('checkout_' + (new Date).getTime());
}