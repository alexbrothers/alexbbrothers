import { Typography, Box, TextField, Button, Snackbar, Alert, CircularProgress } from "@mui/material";
import SectionContainer from "../components/SectionContainer";
import SectionHeader from "../components/SectionHeader";
import { getContentfulClient } from "../lib/contentful";
import { GetStaticProps } from 'next'
import React from "react";
import validator from 'validator';
import Head from 'next/head';

interface FormErrors {
    name: boolean,
    email: boolean,
    message: boolean,
}

interface Contact {
    header: string,
    slug: string,
}

export default function Contact(props: Contact) {
    const baseUrl = process.env.BASE_URL || "https://alexbrothers.dev";
    const canonicalUrl = process.env.BASE_URL || "https://alexbbrothers.vercel.app";

    const [nameValue, setNameValue] = React.useState<string>('');
    const [emailValue, setEmailValue] = React.useState<string>('');
    const [messageValue, setMessageValue] = React.useState<string>('');
    const [formErrors, setFormErrors] = React.useState<FormErrors>({
        name: false,
        email: false,
        message: false,
    });
    const [formSubmittedSuccess, setFormSubmittedSuccess] = React.useState<Boolean>(false);
    const [formSubmittedError, setFormSubmittedError] = React.useState<Boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
        setFormSubmittedSuccess(false);
        setFormSubmittedError(false);
    }

    const handleNameChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setNameValue(e.currentTarget.value);
    }

    const handleEmailChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setEmailValue(e.currentTarget.value);
    }

    const handleMessageChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMessageValue(e.currentTarget.value);
    }

    const isFormError = (errors: FormErrors) => {
        return errors.name || errors.email || errors.message;
    }

    const clearFormErrors = () => {
        setFormErrors({
            name: false,
            email: false,
            message: false,
        });
    }

    const resetForm = () => {
        setNameValue('');
        setEmailValue('');
        setMessageValue('');
    }

    const validateForm = (): FormErrors => {
        const formErrors: FormErrors = {
            name: false,
            email: false,
            message: false,
        }
        if (validator.isEmpty(nameValue, {ignore_whitespace: true})) {
            formErrors.name = true;
        }
        if (validator.isEmpty(emailValue, {ignore_whitespace: true}) || !validator.isEmail(emailValue)) {
            formErrors.email = true;
        }
        if (validator.isEmpty(messageValue, {ignore_whitespace: true})) {
            formErrors.message = true;
        }

        return formErrors;
    }

    const handleSubmit = async () => {
        const errors = validateForm();
        if (!isFormError(errors)) {
            clearFormErrors();
            try {
                setIsLoading(true);
                const response = await fetch('api/contact', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: nameValue,
                        email: emailValue,
                        message: messageValue,
                    })
                });
                const responseJson = await response.json();
                if (response.status !== 200) {
                    throw new Error(responseJson.message);
                }
                setFormSubmittedSuccess(true);
                resetForm();
            } catch (e) {
                console.log("unable to send email to server ", e.message);
                setFormSubmittedError(true);
            } finally {
                setIsLoading(false);
            }
        }
        else {
            setFormErrors(errors);
        }
    }

    return (
        <>
            <Head>
                <title>Contact | AlexBrothers</title>
                <meta
                    name="description"
                    content="Contact Alex Brothers."
                    key="desc"
                />
                <meta
                    property="og:title"
                    content="Contact | AlexBrothers"
                />
                <meta
                    property="og:description"
                    content="Contact Alex Brothers."
                />
                <meta
                    property="og:image"
                    content={`${baseUrl}/avatar.png`}
                />
                <link
                    rel="canonical"
                    href={`${canonicalUrl}/contact`}
                    key="canonical"
                />
            </Head>
            <SectionContainer>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    rowGap: "30px"
                }}>
                    <SectionHeader name={props.header} />
                    <Typography paragraph>
                        {props.slug}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        rowGap: "10px",
                        width: {
                            xs: "100%",
                            md: "75%",
                        },
                        margin: "auto",
                    }}>
                        <TextField 
                            id="name" 
                            label="Name" 
                            variant="filled" 
                            sx={{width: "100%"}}
                            required
                            onChange={handleNameChange}
                            error={formErrors.name}
                            value={nameValue}
                        />
                        <TextField 
                            id="email" 
                            label="Email" 
                            variant="filled" 
                            sx={{width: "100%"}}
                            required
                            onChange={handleEmailChange}
                            error={formErrors.email}
                            value={emailValue}
                        />
                        <TextField 
                            id="message" 
                            label="Message" 
                            variant="filled" 
                            multiline 
                            rows={7}
                            sx={{width: "100%"}}
                            required
                            onChange={handleMessageChange}
                            error={formErrors.message}
                            value={messageValue}
                        />
                        <Button 
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            Submit
                        </Button>
                        {isLoading && (
                            <CircularProgress
                                size={50}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                </Box>
                {formSubmittedSuccess && (
                    <Snackbar open autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                            Contact form submitted.
                        </Alert>
                    </Snackbar>
                )}
                {formSubmittedError && (
                    <Snackbar open autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                            An error occurred submitting the contact form.
                        </Alert>
                    </Snackbar>
                )}
            </SectionContainer>
        </>
    )
}

export const getStaticProps: GetStaticProps = async context => {
const client = getContentfulClient();
    try {
        const contactResponse = await client.getEntries({
            content_type: "contact",
            limit: 1,
        });
        const contactEntry = contactResponse.items[0].fields as any;
        return {
            props: {
                header: contactEntry.header,
                slug: contactEntry.slug,
            }
        }
    } catch(e: any) {
        console.log(`error retrieving contact content from contentful: ${e.message}`);
        throw e;
    }
}