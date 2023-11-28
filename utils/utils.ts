
export const setElementInnerHtml = (elementId: string, innerHtml: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.innerHTML = innerHtml
  }
}

export const setElementValue = (elementId: string, value: string) => {
  const element = document.getElementById(elementId) as HTMLInputElement
  if (element) {
    element.value = value
  }
}

export const setSelectValue = (selectId: string, value: any) => {
  const select = document.getElementById(selectId) as HTMLSelectElement
  if (select) {
    const option = Array.from(select.options).find((option) => option.value === value)
    if (option) {
      option.selected = true
    }
  }
}