import { Typography, Box, TextField, Button } from "@mui/material";
import SectionContainer from "../components/SectionContainer";
import SectionHeader from "../components/SectionHeader";
import { getContentfulClient } from "../lib/contentful";
import { GetStaticProps } from 'next'
import React from "react";
import validator from 'validator';

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
    const [nameValue, setNameValue] = React.useState<string>('');
    const [emailValue, setEmailValue] = React.useState<string>('');
    const [messageValue, setMessageValue] = React.useState<string>('');
    const [formErrors, setFormErrors] = React.useState<FormErrors>({
        name: false,
        email: false,
        message: false,
    });

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

    const handleSubmit = () => {
        const errors = validateForm();
        if (!isFormError(errors)) {
            clearFormErrors();
            console.log("SENDING TO SERVER");
        }
        else {
            setFormErrors(errors);
        }
    }

    return (
        <>
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
                        width: "75%",
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
                        />
                        <TextField 
                            id="email" 
                            label="Email" 
                            variant="filled" 
                            sx={{width: "100%"}}
                            required
                            onChange={handleEmailChange}
                            error={formErrors.email}
                        />
                        <TextField 
                            id="message" 
                            label="Message" 
                            variant="filled" 
                            multiline 
                            rows={5} 
                            maxRows={10} 
                            sx={{width: "100%"}}
                            required
                            onChange={handleMessageChange}
                            error={formErrors.message}
                        />
                        <Button 
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
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