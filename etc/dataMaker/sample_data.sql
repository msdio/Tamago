-- Typing Data

INSERT INTO TYPING (CREATED_DATE, UPDATED_DATE, CONTENT, CONTENT_TYPE, LANGUAGE, LENGTH, VIEW_COUNT)
VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'hahaha', true, 'English', 11, 0);

INSERT INTO TYPING (CREATED_DATE, UPDATED_DATE, CONTENT, CONTENT_TYPE, LANGUAGE, LENGTH, VIEW_COUNT)
VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Hello world', true, 'English', 11, 0);

INSERT INTO TYPING (CREATED_DATE, UPDATED_DATE, CONTENT, CONTENT_TYPE, LANGUAGE, LENGTH, VIEW_COUNT)
VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '소 잃고 외양간 고치기', true, 'Korean', 12, 0);

INSERT INTO TYPING (CREATED_DATE, UPDATED_DATE, CONTENT, CONTENT_TYPE, LANGUAGE, LENGTH, VIEW_COUNT)
VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'こんにちは世界', true, 'Japanese', 7, 0);

-- Long Typing Data
INSERT INTO long_typing (title, content, thumbnail, language, LENGTH, total_page, VIEW_COUNT)
VALUES ('애국가 1절', '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세', SUBSTRING(content, 1, 10),
        'KOREAN', CHAR_LENGTH(REPLACE(content, '\n', '')), ceiling(length / 150.0), 0);

INSERT INTO long_typing (title, content, thumbnail, language, LENGTH, total_page, VIEW_COUNT)
VALUES ('애국가 2절', '남산위에 저 소나무 철갑을 두른듯 바람서리 불변함은 우리기상 일세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세', SUBSTRING(content, 1, 10),
        'KOREAN', CHAR_LENGTH(REPLACE(content, '\n', '')), ceiling(length / 150.0), 0);

INSERT INTO long_typing (title, content, thumbnail, language, LENGTH, total_page, VIEW_COUNT)
VALUES ('애국가 3절', '가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편단심일세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세', SUBSTRING(content, 1, 10),
        'KOREAN', CHAR_LENGTH(REPLACE(content, '\n', '')), ceiling(length / 150.0), 0);

INSERT INTO long_typing (title, content, thumbnail, language, LENGTH, total_page, VIEW_COUNT)
VALUES ('애국가 4절', '이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라사랑하세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세', SUBSTRING(content, 1, 10),
        'KOREAN', CHAR_LENGTH(REPLACE(content, '\n', '')), ceiling(length / 150.0), 0);

INSERT INTO long_typing (title, content, thumbnail, language, LENGTH, total_page, VIEW_COUNT)
VALUES ('Twinkle little star', 'Twinkle, twinkle, little star, How I wonder what you are.
Up above the world so high,
Like a diamond in the sky.
Twinkle, twinkle, little star,
How I wonder what you are!
Twinkle, twinkle, little star,
How I wonder what you are!
Up above the world so high,
Like a Diamond in the sky.
Twinkle, twinkle, little star,
How I wonder what you are!
Twinkle, twinkle, little star,
How I wonder what you are!', SUBSTRING(content, 1, 10), 'ENGLISH', CHAR_LENGTH(REPLACE(content, '\n', '')),
        ceiling(length / 150.0), 0);
