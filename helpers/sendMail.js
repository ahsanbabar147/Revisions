/* eslint-disable */
"use strict"
/*
##################################################################
-- Name             : Xml2Json.js
-- Creation Date    : 20-7-2016
-- Author           : Abdulhaq Shah
-- Jira Reference   : ITB-171
-- Purpose          : Sending Email vis SMTP
-- Parameters       : CredentialValue,Url,Id,StartValue, EndValue
-- Returns          : responce Message (failer/sent)
-- Notes for Others : Sending mail to new register customer
-- Reviewed By      : Junaid Malik
-- Reviewed Date    : 23-07-2019
##################################################################
-- Version     Revision By    Ticket Reference     Description
-- 1.1          Junaid
##################################################################
*/
let nodemailer = require('nodemailer');
let xoauth2 = require('xoauth2');
let smtpTransport = require('nodemailer-smtp-transport');

module.exports = function(data) {

    let recepientEmail = data.email;
    let subjectEmail = data.subject;
    let emailBody = data.html;

    let promise = new Promise(function(resolve, reject) {
        let Xml;
        let options;
        let smtpConfig = {
            transport: "SMTP",
            host: "mail.itboost.com",
            secureConnection: false,
            port: 2525,
            //secure: true,
            // requiresAuth: true, // use SSL
            connectionTimeout: 15000,
            auth: {
                //domain: 'thd',
                user: 'thd\\no-reply', //
                pass: 'ITB10!3375' //
            },
            //secure:true,
            tls: {
                rejectUnauthorized: false
            },
        };

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(smtpTransport(smtpConfig));

        // setup e-mail data with unicode symbols
        let mailOptions = {
            from: '"ITBoost" <no-reply@itboost.com>', // sender address
            to: recepientEmail, // list of receivers
            subject: subjectEmail, // Subject line'Welcome to ITBoost!'
            //text: 'Hello world 🐴', // plaintext body
            html: emailBody

            // // html body
        };

        // verify connection configuration
        transporter.verify(function(error, success) {
            if (error) {
                reject({
                    status: false,
                    error: error
                });
            } else {
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        reject({
                            status: false,
                            error: error
                        });
                    } else {
                        resolve({
                            status: true,
                            message: info.response
                        });
                    }
                });
            }
        });
    }).catch(function(err) {
        return err;
    });
    return promise;
};