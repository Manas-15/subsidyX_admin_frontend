import React, { useEffect, useState } from 'react'
import styles from "../../styles/Home.module.css"
import { CustomButton, PaginationDropdown } from './CustomButton'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
const Pagination = ({ pageSize, setPageSize, page, setPage, totalItems, pageSizeOptions }) => {
    const [total, setTotal] = useState()
    useEffect(() => {
        if ((totalItems / pageSize) > parseInt(totalItems / pageSize)) {
            setTotal(parseInt(totalItems / pageSize) + 1)
        } else {
            setTotal(parseInt(totalItems / pageSize))
        }
    }, [pageSize, totalItems])
    console.log(totalItems / pageSize);
    return (
        <div style={{ marginTop: "1rem" }} className={styles.pagination_box}>
            <div><PaginationDropdown pageSizeOptions={pageSizeOptions} pageSize={pageSize} setPageSize={setPageSize} /></div>
            <div>
                <CustomButton
                    onClick={() => { setPage(1) }}
                    disabled={page === 1}
                    bgColor={'white'}
                    name={<BsChevronDoubleLeft
                        color='black'
                        className='action-icon'
                        size={'18px'} />
                    }
                />
                <CustomButton
                    onClick={() => { setPage(Math.max(1, page - 1)) }}
                    disabled={page === 1}
                    bgColor={'white'}
                    name={<IoIosArrowBack
                        color='black'
                        className='action-icon'
                        size={'18px'} />
                    }
                />
                <CustomButton
                    color={'black'}
                    onClick={() => { setPage(Math.max(1, page - 1)) }}
                    display={page === 1 ? 'none' : null}
                    bgColor={'white'}
                    name={page - 1}
                />
                <CustomButton
                    border={"1px solid rgb(70, 130, 227)"}
                    color={"rgb(70, 130, 227)"}
                    bgColor={'white'}
                    name={page
                    }
                />
                <CustomButton
                    color={'black'}
                    onClick={() => { setPage(Math.min(total, page + 1)) }}
                    display={page === total ? 'none' : null}
                    bgColor={'white'}
                    name={page + 1
                    }
                />
                <CustomButton
                    onClick={() => { setPage(Math.min(total, page + 1)) }}
                    disabled={page === total}
                    bgColor={'white'}
                    name={<IoIosArrowForward
                        color='black'
                        className='action-icon'
                        size={'18px'} />
                    }
                />
                <CustomButton
                    onClick={() => { setPage(total) }}
                    disabled={page === total}
                    bgColor={'white'}
                    name={
                        <BsChevronDoubleRight
                            color='black'
                            className='action-icon'
                            size={'18px'} />
                    }
                />

            </div>
        </div>
    )
}

export default Pagination
