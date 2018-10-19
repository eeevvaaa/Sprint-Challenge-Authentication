<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
Sessions are a simple way to store data for individual users against a unique session ID. This can be used to persist state information between page requests. 

2. What does bcrypt do to help us store passwords in a secure manner.
bcrypt hashes the passwords so that it is not stored as plain text in the database. If someone got their hands on the hashes, it would be diffucult for them to restore it back to orginal password.

3. What does bcrypt do to slow down attackers?
accumilative hashing rounds.

4. What are the three parts of the JSON Web Token?
Header, payload, signature.
