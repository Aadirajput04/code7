/* eslint-disable no-console */
import {
    logEvent,
    setUserProperties
} from 'firebase/analytics'
import {
    round
} from 'lodash-es'
import {
    analytics
} from '@/modules/firebase.js'
import {
    DEVELOPMENT
} from '~/utils/constants.js'
import {
    getPlan,
    getPrice
} from '@/lib/data/plans.js'

const GA_EVENTS = {
    OnboardingStart: 'onboarding_start',
    OnboardingComplete: 'onboarding_complete',
    NewCustomer: 'new_customer',
    Publish: 'site_publish',
    ViewPlans: 'view_plans',
    Checkout: 'begin_checkout', // Measure the 1st step in a checkout process by logging a begin_checkout event with one or more items defined with the relevant fields.
    Purchase: 'purchase',
}

const logAnalytics = (eventName, eventData = {}) => {
    console.groupCollapsed(
        '🟠%c GA Event DEV:',
        'color: #00b8f9',
        eventName,
    )
    console.group('Event Data')
    if (Object.entries(eventData).length < 3) {
        for (const [k, v] of Object.entries(eventData))
            console.log(k, v)
    } else {
        // Or the rest folded
        console.log(eventData)
    }
    console.groupEnd()
    console.groupEnd()
}

/**
 * Capture an event in
 *
 * @param {*} eventName
 * @param {*} [eventData={}]
 */
const trackEvent = (eventName, eventData = {}) => {
    if (DEVELOPMENT) {
        logAnalytics(eventName, eventData)
        return
    }

    if (analytics == null)
        return

    logEvent(analytics, eventName, eventData, {})
}

/**
 * User properties are attributes you define to describe segments of your user base,
 * such as language preference or geographic location.
 * These can be used to define audiences for your app. This guide shows you how to
 * set user properties in your app.
 *
 * @param {*} [propertyData={}]
 */
const trackUserProperty = (type, value) => {
    if (analytics == null)
        return

    setUserProperties(analytics, {
        [type]: value
    })
}

/**
 * Measure a purchase by logging a purchase event with one or more items defined with the relevant fields
 * @param {*} eventName
 * @param {*} [eventData={}]
 */
const trackPurchase = async (uId, planId, priceId) => {
    // load price from database
    const plan = await getPlan(planId)
    const price = await getPrice(planId, priceId)
    const value = round(price ? .unit_amount / 100, 2)

    // Example event Data:
    const category = `${price?.interval_count} ${price?.interval}`
    const eventData = {
        transaction_id: `${uId}-${priceId}`,
        currency: price ? .currency,
        plan: `${plan?.name} - ${category}`,
        value, // Total Revenue
        tax: 0,
        shipping: 0,
        items: [{
            item_id: price ? .product,
            quantity: 1,
            item_name: plan ? .name,
            item_category: `${price?.interval_count} ${price?.interval}`,
            price: value,
        }],
    }
    trackEvent(GA_EVENTS.Purchase, eventData)
}

export {
    trackEvent,
    trackPurchase,
    trackUserProperty,
    GA_EVENTS
}