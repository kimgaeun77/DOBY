package kr.co.doby.web.etc;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Paging {

    private Integer totalRecord;
    private Integer currentPage;
    /* 한 페이지에 보여질 게시글 수 */
    private Integer recordSizePerPage;
    /* 한 페이지 블럭 당 페이지 수 */
    private Integer pageSizePerBlock;
    /* 현재 페이지 블럭 번호 */
    private Integer currentPageBlockNum;
    /* 마지막 페이지 블럭 번호 */
    private Integer lastPageBlockNum;
    /* 현재 페이지 블럭 첫번째 페이지 번호 */
    private Integer currentPageBlockFirstPageNum;
    /* 현재 페이지 블럭 마지막 페이지 번호 */
    private Integer currentPageBlockLastPageNum;
    private Boolean isFirstPageNum;
    private Integer totalPage;
    private Boolean prev;
    private Boolean next;

    public Paging calc() {

        totalPage = totalRecord / recordSizePerPage + (totalRecord % recordSizePerPage == 0 ? 0 : 1);

        currentPageBlockNum = ((currentPage - 1) / pageSizePerBlock);
        lastPageBlockNum = ((totalPage - 1) / pageSizePerBlock);

        currentPageBlockFirstPageNum = currentPageBlockNum * pageSizePerBlock + 1;
        currentPageBlockLastPageNum = currentPageBlockFirstPageNum + pageSizePerBlock - 1;

        if (currentPageBlockLastPageNum > totalPage)
            currentPageBlockLastPageNum = totalPage;

        isFirstPageNum = currentPage.equals(currentPageBlockFirstPageNum);

        prev = currentPageBlockNum > 0;
        next = currentPageBlockNum < lastPageBlockNum;

        return this;
    }

}
