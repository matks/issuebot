/**
 * 2007-2018 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2018 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

module.exports = class TestUtils {

  /**
   * @param {string} action
   * @param {int} issueNumber
   */
  getDefaultIssuePayloadMock (action, issueNumber) {
    return {
      'action': action,
      'issue': {
        'id': 12345,
        'node_id': 'abcd',
        'number': issueNumber,
        'title': 'An issue',
        'milestone': {'title': '1.7.4.3'},
        'labels': [
          {
            'id': 789,
            'node_id': 'abcd',
            'url': 'https://github.com/prestashop/test-project-bot/labels/todo',
            'name': 'todo',
            'default': false
          }]
      }
    };
  }

  /**
   * @param {string} action
   * @param {int} pullRequestNumber
   */
  getDefaultPullRequestPayloadMock (action, pullRequestNumber) {
    return {
      'action': action,
      'issue': {
        'id': 12345,
        'node_id': 'abcd',
        'number': pullRequestNumber,
        'title': 'A pull request',
        'milestone': {'title': '1.7.4.3'},
        'labels': [
          {
            'id': 789,
            'node_id': 'abcd',
            'url': 'https://github.com/prestashop/test-project-bot/labels/todo',
            'name': 'todo',
            'default': false
          }],
        'pull_request': {
          'url': 'https://api.github.com/repos/prestashop/test-project-bot/pulls/' + pullRequestNumber,
        },
        'body': '\r\n| Questions     | Answers\r\n| ------------- | -------------------------------------------------------\r\n| Branch?       | develop\r\n| Description?  | aaa\r\n| Type?         | improvement\r\n| Category?     | BO\r\n| BC breaks?    | no\r\n| Deprecations? | no\r\n| Fixed ticket? | #12\r\n| How to test?  | \r\n'
      }
    };
  }

  getDefaultGithubAPIClientMock () {
    return {
      projects: {
        getProjectCards: jest.fn().mockReturnValue(Promise.resolve({
          data:
            [
              {
                content_url: 'https://github.com/prestashop/test-project-bot/issues/8',
                column_url: 'https://api.github.com/projects/columns/3311239',
                id: 'z'
              },
              {
                content_url: 'https://github.com/prestashop/test-project-bot/issues/11',
                column_url: 'https://api.github.com/projects/columns/3311239',
                id: 'a'
              },
            ],
        })),
        createProjectCard: jest.fn().mockReturnValue(Promise.resolve({})),
        deleteProjectCard: jest.fn().mockReturnValue(Promise.resolve({})),
        moveProjectCard: jest.fn().mockReturnValue(Promise.resolve({}))
      },
      issues: {
        get: jest.fn().mockReturnValue(Promise.resolve({
          data: {id: 'abcd', milestone: null}
        })),
        edit: jest.fn().mockReturnValue(Promise.resolve({}))
      }
    };
  }

  /**
   * @param {array} expected
   * @param {array} result
   *
   * @todo: replace jest by jasmine to avoir deep compare with toEqual()
   */
  expectArraysToBeEqual (result, expected) {
    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
  }
};
