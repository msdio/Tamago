create table typing_history
(
    id              int auto_increment
        primary key,
    typing_id       int              null,
    long_typing_id   int              null,
    user_id         int              not null,
    content_type    bit default b'1' null,
    mode            varchar(255)     null,
    typing_accuracy double           null,
    wpm             int              null,
    wrong_keys      json             null,
    before_mmr      int              null,
    page            int              null,
    increased_value int              null,
    start_time      datetime(6)      null,
    end_time        datetime(6)      null,
    created_date    datetime(6)      null,
    updated_date    datetime(6)      null
) ENGINE = InnoDB;

create index user_index on typing_history(user_id);

create table statistics_all
(
    id               int auto_increment
        primary key,
    created_date     datetime(6) null,
    updated_date     datetime(6) null,
    accuracy_average double      not null,
    size             int         not null,
    wpm_average      double      not null,
    wrong_key_info   json        null,
    user_id          int         null
);

create table user
(
    id           int auto_increment
        primary key,
    created_date datetime                    null,
    updated_date datetime                    null,
    email        varchar(255)                not null,
    introduce    varchar(20)                 null,
    nickname     varchar(10)                 not null,
    password     varchar(255)                not null,
    profile_img  varchar(255)                null,
    provider     varchar(255) default 'none' null,
    provider_id  varchar(255)                null,
    role         varchar(255)                null,
    status       bit          default b'1'   null,
    terms        bit          default b'1'   null,
    constraint UK_n4swgcf30j6bmtb4l4cjryuym
        unique (nickname)
);