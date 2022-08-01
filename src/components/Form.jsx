import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Form() {
    const initialValues = {
        username: "",
        password: "",
        email: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formerror, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    };
    const handleSubmit = (e) => {
        console.log("handle.....");
        e.preventDefault();
        setFormError(validate(formValues));
        console.log(validate(formValues));
        setIsSubmit(true);
    };
    useEffect(() => {
        if (Object.keys(formerror).length === 0 && isSubmit) {
            console.log(formValues, "++++++++++++");
        }
    }, [formerror]);
    const validate = (values) => {
        const errors = {};
        const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!re.test(values.email)) {
            errors.email = "This is not a valid email!";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        } else if (values.password.length < 4) {
            errors.password = "password must be more than 4 characters!";
        } else if (values.password.length > 10) {
            errors.password =
                "password can not exceed more than 10 characters!";
        }
        return errors;
    };
    return (
        <Container className="container">
            {Object.keys(formerror).length === 0 && isSubmit ? (
                <div className="ui message success">signes in successfully</div>
            ) : (
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}
            <FormContainer>
                <Heading>Login Form</Heading>
                <div className="ui divider"></div>
                <Content className="ui form">
                    <Section className="field">
                        <Label>Username</Label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                    </Section>
                    <Paragraph>{formerror.username}</Paragraph>
                    <Section className="field">
                        <Label>Email</Label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </Section>
                    <Paragraph>{formerror.email}</Paragraph>
                    <Section className="field">
                        <Label>Password</Label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </Section>
                    <Paragraph>{formerror.password}</Paragraph>

                    <Button
                        className="fluid ui button blue"
                        value="Submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Content>
            </FormContainer>
        </Container>
    );
}

export default Form;
const Container = styled.div``;
const FormContainer = styled.div`
    width: 40%;
    margin: 40px auto;
    border: 1px solid;
    box-shadow: 5px 10px 15px 10px #888888;
    border-radius: 8px;
`;
const Heading = styled.h1`
    font-size: 30px;
    text-align: center;
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;
const Content = styled.div`
    padding: 20px;
    width: 90%;
    margin: 0 auto;
`;
const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    input {
        /* width: 100%; */
        padding: 10px;

        border-radius: 6px;
        border: 1px solid #888888;
        &:hover {
            border: 1px solid yellow;
        }
    }
`;
const Button = styled.div`
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    color: #fff;
    background: linear-gradient(92.17deg, #0fa76f 0.21%, #0f9ea7 101.05%);
    border-radius: 8px;
    width: 100%;
`;
const Label = styled.label`
    width: 20%;
    margin-bottom: 8px;
`;
const Paragraph = styled.p`
    color: red;
`;
