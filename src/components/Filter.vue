<template>
  <form class="filterOptions">
    <div class="options">
      <label class="optionLabels" for="departmentOption">개설학과</label>
      <select id="departmentOption">
        <optgroup label="개설학과">
          <option>전체</option>
          <option>금속공예디자인학과</option>
          <option>엽기떡볶이학과</option>
          <option>딸기탕후루학과</option>
        </optgroup>
      </select>
    </div>
    <div class="options">
      <label class="optionLabels" for="subjectDivisionOption">이수구분</label>
      <select id="subjectDivisionOption">
        <optgroup label="이수구분">
          <option>전체</option>
          <option>전공 필수</option>
          <option>전공 선택</option>
          <option>교양 필수</option>
          <option>교양 선택</option>
        </optgroup>
      </select>
    </div>
    <div>
      <label class="optionLabels" for="subjectNameOption">교과목명</label>
      <input type="text" id="subjectNameOption" />
    </div>
    <button class="enrollPageButton" style="margin: 0px 10px">검색</button>
  </form>
</template>

<script>
export default {
  name: "FilterOption",
  data() {
    return {};
  },
};
</script>

<style>
.filterOptions {
  width: fit-content;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 13px;
}

.options {
  padding: 0px 10px;
}

.optionLabels {
  padding-right: 6px;
}
</style>
