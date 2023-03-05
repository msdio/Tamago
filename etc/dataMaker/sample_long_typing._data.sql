-- Long Typing Data
INSERT INTO long_typing (title, content, thumbnail, language, length, total_page, VIEW_COUNT, created_date,
                         updated_date)
VALUES ('애국가 1절', '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세',
        SUBSTRING(REPLACE(content, '\r', ''), 1, 50),
        'KOREAN', CHAR_LENGTH(content), ceiling((LENGTH - CHAR_LENGTH(REPLACE(content, '\n', '')) + 1) / 20.0), 0,
        now(), now());

INSERT INTO long_typing (title, content, thumbnail, language, LENGTH, total_page, VIEW_COUNT, created_date,
                         updated_date)
VALUES ('애국가 2절', '남산위에 저 소나무 철갑을 두른듯 바람서리 불변함은 우리기상 일세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세',
        SUBSTRING(REPLACE(content, '\r', ''), 1, 50),
        'KOREAN', CHAR_LENGTH(content), ceiling((LENGTH - CHAR_LENGTH(REPLACE(content, '\n', '')) + 1) / 20.0), 0,
        now(), now());

INSERT INTO long_typing (title, content, thumbnail, language, LENGTH, total_page, VIEW_COUNT, created_date,
                         updated_date)
VALUES ('애국가 3절', '가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편단심일세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세',
        SUBSTRING(REPLACE(content, '\r', ''), 1, 50),
        'KOREAN', CHAR_LENGTH(content), ceiling((LENGTH - CHAR_LENGTH(REPLACE(content, '\n', '')) + 1) / 20.0), 0,
        now(), now());

INSERT INTO long_typing (title, content, thumbnail, language, LENGTH, total_page, VIEW_COUNT, created_date,
                         updated_date)
VALUES ('애국가 4절', '이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라사랑하세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세',
        SUBSTRING(REPLACE(content, '\r', ''), 1, 50),
        'KOREAN', CHAR_LENGTH(content), ceiling((LENGTH - CHAR_LENGTH(REPLACE(content, '\n', '')) + 1) / 20.0), 0,
        now(), now());

INSERT INTO long_typing (title, content, thumbnail, language, LENGTH, total_page, VIEW_COUNT, created_date,
                         updated_date)
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
How I wonder what you are!', SUBSTRING(REPLACE(content, '\r', ''), 1, 50), 'ENGLISH', CHAR_LENGTH(content),
        ceiling((LENGTH - CHAR_LENGTH(REPLACE(content, '\n', '')) + 1) / 20.0), 0, now(), now());

INSERT INTO long_typing (title, content, thumbnail, language, LENGTH, total_page, VIEW_COUNT, created_date,
                         updated_date)
VALUES ('시간이 들겠지', '지나간 여름 밤 시원한 가을바람
난 여전히 잠에 들기가 쉽지않아
뒤척이고 있어
내가 계획했던 것
유난히 뜨거웠던 너
뭐 하나라도 내 걸로 만들기 어려워
또 시간이 들겠지
또 시간이 들겠지
벌써 1년이 벌써 한달이
벌써 하루가 추억할 시간도 없이
빨리 지나갔고 내게는
또 새로운 고민거리들로
단 한시간 조차 못 버티고 있어
마른 입술이 뜯겨
아직도 적응을 못했어 이런 감정은
지나가버리면 그만인데
모르겠어 지나치는 방법을
억지로 감은 눈을 떴을 때
내일 모레였음 좋겠는데
It takes time
지나간 여름 밤 시원한 가을바람
난 여전히 잠에 들기가 쉽지않아
뒤척이고 있어
내가 계획했던 것
유난히 뜨거웠던 너
뭐 하나라도 내 걸로 만들기 어려워
또 시간이 들겠지
또 시간이 들겠지
It takes time
시간이 들겠지
It takes time
또 시간이 들겠지
It takes time
시간이 들겠지
It takes time
또 시간이 들겠지
언제쯤이면 괜찮아질까
알면서도 자꾸 반복하는 질문
괜찮냐고 들을 때마다
표정은 점점 굳어지는 기분
시간이 들겠지라고 적었다가 지우고
힘들다 라고 써
소원이 있다면 아무 생각 없이
잠들고 싶어
시원한 여름 노래들은 희망고문이었고
오랜만에 갈색의 가을 안에서
나는 기어코
시계만 쳐다보고 있네
얼마나 걸릴 아픔 이길래
이제는 돌아갈 수 없어도
여전히 난 그 자리에 서있어
흩어져 있는 시간 속
우리와 다시 마주칠 순 없을까
많은 시간이 흐른 뒤
그때야 우린 알겠지
내가 계획했던 것
유난히 뜨거웠던 너
뭐 하나라도 내 걸로 만들기 어려워
또 시간이 들겠지
또 시간이 들겠지
It takes time
It takes time
It takes time', SUBSTRING(REPLACE(content, '\r', ''), 1, 50), 'KOREAN', CHAR_LENGTH(content),
        ceiling((LENGTH - CHAR_LENGTH(REPLACE(content, '\n', '')) + 1) / 20.0), 0, now(), now());

INSERT INTO long_typing (title, content, thumbnail, language, LENGTH, total_page, VIEW_COUNT, created_date,
                         updated_date)
VALUES ('Stack', 'public class Stack {
    private int[] data;
    private int top;

    public Stack(int capacity) {
        data = new int[capacity];
        top = -1;
    }

    public void push(int value) {
        if (top == data.length - 1) {
            throw new RuntimeException("Stack is full");
        }
        top++;
        data[top] = value;
    }

    public int pop() {
        if (top == -1) {
            throw new RuntimeException("Stack is empty");
        }
        int value = data[top];
        top--;
        return value;
    }

    public int peek() {
        if (top == -1) {
            throw new RuntimeException("Stack is empty");
        }
        return data[top];
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public boolean isFull() {
        return top == data.length - 1;
    }
}', SUBSTRING(REPLACE(content, '\r', ''), 1, 50),
        'JAVA', CHAR_LENGTH(content), ceiling((LENGTH - CHAR_LENGTH(REPLACE(content, '\n', '')) + 1) / 20.0), 0, now(),
        now());