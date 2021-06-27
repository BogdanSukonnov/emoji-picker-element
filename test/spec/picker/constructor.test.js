import { basicAfterEach, basicBeforeEach, mockDefaultDataSource, tick } from '../shared'
import Picker from '../../../src/picker/PickerElement'
import { getByRole, waitFor } from '@testing-library/dom'
import { DEFAULT_DATA_SOURCE, DEFAULT_LOCALE } from '../../../src/database/constants'

describe('constructor', () => {
  beforeEach(basicBeforeEach)
  afterEach(basicAfterEach)

  async function testWithDefaults (...args) {
    mockDefaultDataSource()
    const picker = new Picker(...args)
    document.body.appendChild(picker)
    const container = picker.shadowRoot.querySelector('.picker')
    await tick(20)

    await waitFor(() => expect(getByRole(container, 'menuitem', { name: /😀/ })).toBeVisible())
    expect(getByRole(container, 'menuitem', { name: /😀/ })).toBeVisible()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenLastCalledWith(DEFAULT_DATA_SOURCE, undefined)

    document.body.removeChild(picker)
    await tick(20)
  }

  test('contructor with undefined options works', async () => {
    await testWithDefaults()
  })

  test('contructor with empty options object works', async () => {
    await testWithDefaults({})
  })

  test('contructor with just dataSource option works', async () => {
    await testWithDefaults({ dataSource: DEFAULT_DATA_SOURCE })
  })

  test('contructor with just locale option works', async () => {
    await testWithDefaults({ locale: DEFAULT_LOCALE })
  })
})
