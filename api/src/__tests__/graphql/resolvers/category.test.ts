import { addCategory } from '../../../graphql/resolvers/category'
import Category from '../../../models/category';

jest.mock('../../../models/category')

describe('graphql/resolves/category', () => {

  it('add category', async () => {
    const add = await addCategory({ category: 'testing' });
    expect(add).toBe('ok');
    expect(Category).toHaveBeenCalledTimes(1);
  })
})
