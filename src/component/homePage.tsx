import Link from 'next/link';
import stylesNav from '@/styles/navbar.module.css';
import styles from '@/styles/Home.module.css';
import { useEffect, useRef, useState } from 'react';
import { useUserData } from '@/context/userData.context';
import { Blog } from '@/types';
import { useRouter } from 'next/router';

const HomePage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const [userName, setUserName] = useUserData()!;

    const [addBtnState, setAddBtnState] = useState(false);

    const [searchBtnStateTitle, setSearchBtnStateTitle] = useState('');

    const [searchBtnStateContent, setSearchBtnStateContent] = useState('');

    const [randomState, setRandomState] = useState(false);

    const router = useRouter();

    const [focus, setFocus] = useState(false);

    const blogTitle = useRef<HTMLInputElement>(null);

    const blogContent = useRef<HTMLTextAreaElement>(null);

    const [currentGreet, setCurrentGreet] = useState('');

    const greet = [
        'How are things?',
        'It’s good to see you',
        'How’s it going?',
        'What’s happening?',
        'What’s the story?',
        'It’s nice to meet you',
        'What’s new?',
        'G’day!',
        'What’s up?',
        'Howdy!',
        'How’s life, mate?'
    ];

    const addingNewBlog = async () => {
        console.log('add button clicked');
        if (`${blogTitle.current?.value}` === '' && `${blogContent.current?.value}` === '') {
            console.log('Please enter title and content of the blog');
            alert('Please enter title and content of the blog');
        } else if (`${blogTitle.current?.value}` === '') {
            console.log('Please enter title of the blog');
            alert('Please enter title of the blog');
        } else if (`${blogContent.current?.value}` === '') {
            console.log('Please enter content of the blog');
            alert('Please enter content of the blog');
        } else {
            const option = {
                method: 'POST',
                body: JSON.stringify({
                    title: blogTitle.current?.value,
                    content: blogContent.current?.value,
                    username: userName
                })
            };

            const res = await fetch('/api/blog', option);
            const data = await res.json();

            if (!data.error) {
                console.log(data.message);
                blogTitle.current!.value = '';
                blogContent.current!.value = '';
            } else {
                console.log(data.message);
            }

            setAddBtnState(!addBtnState);
        }
    };

    const searchingExistingBlog = () => {
        if (`${blogTitle.current?.value}` != '' && `${blogContent.current?.value}` === '') {
            setSearchBtnStateTitle(`${blogTitle.current?.value}`);
            setSearchBtnStateContent('');
        } else if (`${blogTitle.current?.value}` === '' && `${blogContent.current?.value}` != '') {
            setSearchBtnStateContent(`${blogContent.current?.value}`);
            setSearchBtnStateTitle('');
        } else if (`${blogTitle.current?.value}` != '' && `${blogContent.current?.value}` != '') {
            setSearchBtnStateTitle(`${blogTitle.current?.value}`);
            setSearchBtnStateContent(`${blogContent.current?.value}`);
        } else {
            setSearchBtnStateTitle('');
            setSearchBtnStateContent('');
        }
    };
    const handleRandomClick = () => {
        setRandomState(true);
        setAddBtnState(!addBtnState);
    };

    const focusTextArea = () => {
        setFocus(true);
        setAddBtnState(!addBtnState);
    };

    const shuffle = (array: any) => {
        let currentIndex = array.length;
        let randomIndex = 0;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    const handleLogout = () => {
        setUserName(null);
        localStorage.clear();
        router.reload();
    };

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * greet.length);
        setCurrentGreet(greet[randomIndex]);
    }, []);

    useEffect(() => {
        (async () => {
            if (blogContent.current && focus === true) {
                blogContent.current.focus();
            }
            const res = await fetch('/api/blog');
            const data = await res.json();
            if (data.error) alert(data.message);
            const array = data.data;
            const newArray: Blog[] = [];

            array.map((array: Blog, i: number) => {
                if (`${blogTitle.current?.value}` != '' && `${blogContent.current?.value}` === '') {
                    const title = array.title.toLowerCase();
                    if (title.includes(searchBtnStateTitle.toLowerCase())) newArray[i] = array;
                } else if (
                    `${blogContent.current?.value}` != '' &&
                    `${blogTitle.current?.value}` === ''
                ) {
                    const content = array.content.toLowerCase();
                    if (content.includes(searchBtnStateContent.toLowerCase())) newArray[i] = array;
                } else if (
                    `${blogContent.current?.value}` != '' &&
                    `${blogTitle.current?.value}` != ''
                ) {
                    const title = array.title.toLowerCase();
                    const content = array.content.toLowerCase();
                    if (
                        content.includes(searchBtnStateContent.toLowerCase()) &&
                        title.includes(searchBtnStateTitle.toLowerCase())
                    )
                        newArray[i] = array;
                }
            });
            if (randomState) {
                shuffle(array);
                setBlogs(array);
            } else {
                (searchBtnStateTitle === '' && searchBtnStateContent === '') ||
                (searchBtnStateTitle === null && searchBtnStateContent === null)
                    ? setBlogs(data.data)
                    : setBlogs(newArray);
            }
            setRandomState(false);
            setFocus(false);
        })();
    }, [addBtnState, searchBtnStateTitle, searchBtnStateContent]);

    return (
        <>
            <div className={stylesNav.navBar}>
                <Link className={stylesNav.title} href="/">
                    Legend Blogs
                </Link>
                <div className={stylesNav.options}>
                    <Link className={stylesNav.navBtn} href="/">
                        Home
                    </Link>

                    <Link
                        href="/"
                        className={stylesNav.navBtn}
                        onClick={handleRandomClick}
                    >
                        Random
                    </Link>
                    <button
                        onClick={handleLogout}
                        className={`${stylesNav.navBtnLogout} ${stylesNav.navBtn}`}
                    >
                        Logout
                    </button>
                </div>
                <div onClick={focusTextArea} className={stylesNav.search}>
                    <div className={`${stylesNav.rec1} ${stylesNav.rec2}`}>
                        <div>{"What's on your Mind ?"}</div>
                    </div>
                </div>
            </div>

            <div className={styles.greeting}>
                <div className={styles.userName}>
                    <div>Hi</div>
                    <div>{userName},</div>
                </div>
                <div className={styles.greetMsg}>{currentGreet}</div>
            </div>

            <div className={styles.mainDivision}></div>

            <div className={styles.inputBlogArea}>
                <input
                    className={styles.inputBlogTitle}
                    type="text"
                    placeholder=" Blog Title"
                    ref={blogTitle}
                    required
                />
                <div onClick={addingNewBlog}>
                    <svg
                        className={styles.addIcon}
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.33175 17.7429C9.1127 17.7429 8.8328 17.7185 8.49206 17.6698C8.15132 17.5968 7.98095 17.4143 7.98095 17.1222V11.1349L6.95873 10.6238H6.00952C5.32804 10.6238 4.63439 10.6603 3.92857 10.7333C3.24709 10.8063 2.55344 10.8429 1.84762 10.8429H0.569841C0.423809 10.7942 0.302116 10.6968 0.204762 10.5508C0.131746 10.3804 0.0952381 10.064 0.0952381 9.60159C0.0952381 9.26085 0.216931 8.95661 0.460317 8.68889C0.703704 8.42116 0.983598 8.2873 1.3 8.2873H7.57937C7.57937 7.07037 7.54286 6.03598 7.46984 5.18413C7.42116 4.33228 7.39683 3.50476 7.39683 2.70159V1.64286C7.4455 1.47249 7.59153 1.31429 7.83492 1.16825C8.07831 1.02222 8.33386 0.949206 8.60159 0.949206C9.47778 0.949206 9.91587 1.59418 9.91587 2.88413V8.2873C11.2058 8.2873 12.3619 8.25079 13.3841 8.17778C14.4063 8.10476 15.3677 8.06825 16.2683 8.06825C16.755 8.06825 17.0958 8.16561 17.2905 8.36032C17.5095 8.53069 17.619 8.74974 17.619 9.01746C17.619 9.40688 17.5217 9.71111 17.327 9.93016C17.1566 10.1249 17.0714 10.2222 17.0714 10.2222H10.1349V17.3413C10.1349 17.463 10.0254 17.5603 9.80635 17.6333C9.5873 17.7063 9.4291 17.7429 9.33175 17.7429Z"
                            fill="#AAC4FF"
                        />
                    </svg>
                </div>

                <div onClick={searchingExistingBlog}>
                    <svg
                        className={styles.searchIcon}
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.37077 0.0210593C3.30632 0.0210593 0 3.32738 0 7.39183C0 11.4563 3.30632 14.7626 7.37077 14.7626C8.61327 14.7626 9.83471 14.4678 10.8666 13.8992C10.9493 13.9986 11.0409 14.0903 11.1404 14.1729L13.2463 16.2789C13.4408 16.4977 13.6779 16.6744 13.9431 16.7983C14.2084 16.9221 14.4961 16.9905 14.7887 16.9991C15.0813 17.0077 15.3726 16.9564 15.6447 16.8484C15.9167 16.7403 16.1639 16.5778 16.3708 16.3709C16.5778 16.1639 16.7403 15.9167 16.8484 15.6447C16.9564 15.3726 17.0077 15.0813 16.9991 14.7887C16.9905 14.4961 16.9221 14.2084 16.7983 13.9432C16.6744 13.6779 16.4977 13.4408 16.2789 13.2463L14.1729 11.1404C14.0704 11.0378 13.9574 10.946 13.836 10.8666C14.4046 9.83471 14.7626 8.63433 14.7626 7.37077C14.7626 3.30632 11.4563 0 7.39183 0L7.37077 0.0210593ZM7.37077 2.12699C10.298 2.12699 12.6356 4.46458 12.6356 7.39183C12.6356 8.78175 12.1302 10.0664 11.2457 11.014C11.2246 11.0351 11.2036 11.0562 11.1825 11.0772C11.083 11.1599 10.9914 11.2515 10.9087 11.351C9.98213 12.1934 8.71857 12.6777 7.34971 12.6777C4.42246 12.6777 2.08488 10.3401 2.08488 7.41289C2.08488 4.48564 4.42246 2.14805 7.34971 2.14805L7.37077 2.12699Z"
                            fill="#AAC4FF"
                        />
                    </svg>
                </div>

                <textarea
                    className={styles.inputBlogMatter}
                    name=""
                    id=""
                    cols={50}
                    rows={5}
                    placeholder=" Start Typing..."
                    ref={blogContent}
                    required
                ></textarea>
            </div>
            <div className={styles.previousBlogs}>
                {blogs.map((blog, i) => {
                    return (
                        <div className={styles.existingBlogArea} key={i}>
                            <div className={styles.xyz}>
                                <div className={styles.existingBlogAuthorName}>{blog.username}</div>
                                <div className={styles.existingBlogTime}>
                                    {new Date(blog.timestamp).toDateString()}
                                </div>
                            </div>

                            <input
                                className={styles.existingBlogTitle}
                                type="text"
                                value={blog.title}
                                readOnly
                            />
                            <textarea
                                className={styles.existingBlogMatter}
                                name=""
                                id=""
                                cols={50}
                                rows={5}
                                readOnly
                                value={blog.content}
                            ></textarea>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default HomePage;

