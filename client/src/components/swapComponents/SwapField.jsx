import React from 'react'
import Selector from './SwapSelector'

const SwapField = React.forwardRef(({ obj }, inputRef) => {
  const { id, value = '', setValue, defaultValue, setToken, ignoreValue } = obj

  return (
    <div className='flex items-center rounded-xl'>
      <input
      id={id}
        ref={inputRef}
        className={' w-full outline-none h-8 px-2 appearance-none text-3xl bg-transparent'}
        type={'number'}
        value={value}
        placeholder={'0.0'}
        onChange={e => {
          setValue(e.target.value)
        }}
      />

      <Selector
        defaultValue={defaultValue}
        ignoreValue={ignoreValue}
        setToken={setToken}
        id={id}
        className={'ml-25'}
      />
    </div>
  )

  
})

export default SwapField