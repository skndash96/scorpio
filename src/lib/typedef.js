/**
 * @typedef {object} ReportSchema
 * @property {string} timestamp timestamp of incidence
 * @property {string} id uuid
 * @property {string} title
 * @property {string} info
 * @property {string} city
 * @property {string} dept
 * @property {ProfileSchema} accountable //INNER JOIN from Profiles table
 */

/**
 * @typedef {object} AddReport
 * @property {Date} timestamp timestamp of incidence
 * @property {string} title
 * @property {string} info
 * @property {string} city
 * @property {string} dept
 * @property {string|null} accountable uuid
 */



/**
 * @typedef {object} ProfileSchema
 * @property {string} id uuid
 * @property {string} created_at date timestamp
 * @property {string} name
 * @property {string|null} image url
 */

/**
 * @typedef {object} AddProfile
 * @property {string} name
 * @property {string|null} image url
 */